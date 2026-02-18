from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import httpx
from typing import Optional, List

app = FastAPI()

# CORS Configuration
cors_origins = os.environ.get("CORS_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Environment variables
RAPIDAPI_KEY = os.environ.get("RAPIDAPI_KEY")
RAPIDAPI_HOST = "jsearch.p.rapidapi.com"


class Job(BaseModel):
    id: str
    title: str
    company: str
    location: Optional[str] = None
    salary: Optional[str] = None
    apply_url: Optional[str] = None


class JobsResponse(BaseModel):
    jobs: List[Job]
    total: int


def map_experience_to_search_term(experience: str) -> str:
    """Map experience level to search modifier."""
    mapping = {
        "Entry": "Junior",
        "1-3 years": "Associate",
        "3-5 years": "Senior",
        "5+ years": "Lead OR Manager"
    }
    return mapping.get(experience, "")


@app.get("/")
async def root():
    return {"message": "Income Recovery API - Job Search Service"}


@app.get("/api/jobs")
async def search_jobs(
    role: str,
    experience: str,
    location: str = "Remote",
    jobType: str = "Full-time"
):
    """
    Search for jobs using JSearch RapidAPI.
    
    Parameters:
    - role: Job role/title to search for
    - experience: Experience level (Entry, 1-3 years, 3-5 years, 5+ years)
    - location: Job location (default: Remote)
    - jobType: Type of job (default: Full-time)
    """
    
    if not RAPIDAPI_KEY:
        raise HTTPException(
            status_code=500,
            detail="API key not configured. Please set RAPIDAPI_KEY environment variable."
        )
    
    # Construct intelligent search query
    experience_modifier = map_experience_to_search_term(experience)
    search_query = f"{experience_modifier} {role}" if experience_modifier else role
    
    # Add job type to query
    if jobType and jobType != "Full-time":
        search_query += f" {jobType}"
    
    try:
        # Call JSearch API
        headers = {
            "X-RapidAPI-Key": RAPIDAPI_KEY,
            "X-RapidAPI-Host": RAPIDAPI_HOST
        }
        
        params = {
            "query": search_query,
            "page": "1",
            "num_pages": "1",
            "date_posted": "all"
        }
        
        # Add location filter if not Remote
        if location and location.lower() != "remote":
            params["location"] = location
        
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(
                f"https://{RAPIDAPI_HOST}/search",
                headers=headers,
                params=params
            )
            
            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"Job search API error: {response.text}"
                )
            
            data = response.json()
            
            # Parse and simplify job data
            jobs = []
            raw_jobs = data.get("data", [])
            
            # Limit to 20 results
            for job_data in raw_jobs[:20]:
                job = Job(
                    id=job_data.get("job_id", ""),
                    title=job_data.get("job_title", "Untitled Position"),
                    company=job_data.get("employer_name", "Company Name Not Available"),
                    location=job_data.get("job_city") or job_data.get("job_country") or "Location Not Specified",
                    salary=job_data.get("job_salary", None),
                    apply_url=job_data.get("job_apply_link") or job_data.get("job_google_link", "")
                )
                jobs.append(job)
            
            return {
                "jobs": jobs,
                "total": len(jobs),
                "query": search_query
            }
            
    except httpx.TimeoutException:
        raise HTTPException(
            status_code=504,
            detail="Job search request timed out. Please try again."
        )
    except httpx.RequestError as e:
        raise HTTPException(
            status_code=503,
            detail=f"Failed to connect to job search service: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "service": "job-search-api",
        "api_configured": bool(RAPIDAPI_KEY)
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)