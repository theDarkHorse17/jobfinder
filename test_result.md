#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: "Test the Income Recovery job search application comprehensively with hero section, search form validation, job search flow, bookmark functionality, and responsive design"

frontend:
  - task: "Hero Section Display"
    implemented: true
    working: true
    file: "/app/frontend/src/components/HeroSection.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "testing"
        comment: "Need to test hero section with gradient text 'Career Move', badge 'Your Next Opportunity Awaits', and search form with 4 fields"
      - working: true
        agent: "testing"
        comment: "✅ PASSED: Hero section displays perfectly with gradient text 'Career Move', badge 'Your Next Opportunity Awaits', and all 4 form fields (Role, Experience, Location, Job Type). Search button 'Search Opportunities' is present and functional."

  - task: "Search Form Validation"
    implemented: true
    working: true
    file: "/app/frontend/src/components/SearchForm.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "testing"
        comment: "Need to test form validation for role and experience fields, error toast messages"
      - working: true
        agent: "testing"
        comment: "✅ PASSED: Form validation working correctly with HTML5 validation ('Please fill out this field') and toast notifications for experience field validation. Both role and experience fields are properly validated before submission."

  - task: "Job Search Flow"
    implemented: true
    working: true
    file: "/app/frontend/src/pages/HomePage.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "testing"
        comment: "Need to test complete job search flow with API integration, loading states, and results display"
      - working: true
        agent: "testing"
        comment: "✅ PASSED: Complete job search flow working excellently. API integration successful with JSearch API, loading states display properly ('Searching Opportunities'), and results show 10 job opportunities with proper job cards layout. Compact search bar appears after results as expected."

  - task: "Job Card Interactions"
    implemented: true
    working: true
    file: "/app/frontend/src/components/JobCard.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "testing"
        comment: "Need to test bookmark functionality, apply now button, and toast notifications"
      - working: true
        agent: "testing"
        comment: "✅ PASSED: Job card interactions working perfectly. Bookmark buttons functional on all job cards, Apply Now buttons present and clickable, job cards display company names, locations, and job titles correctly. All interactive elements responsive."

  - task: "Saved Jobs Feature"
    implemented: true
    working: true
    file: "/app/frontend/src/components/Header.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "testing"
        comment: "Need to test saved jobs counter and localStorage functionality"
      - working: true
        agent: "testing"
        comment: "✅ PASSED: Saved jobs feature working correctly. Counter updates when jobs are bookmarked, saved jobs button shows alert with count, localStorage functionality implemented for persistence across sessions."

  - task: "Responsive Design"
    implemented: true
    working: true
    file: "/app/frontend/src"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "testing"
        comment: "Need to test responsive design at mobile (390px), tablet (768px), and desktop (1920px) widths"
      - working: true
        agent: "testing"
        comment: "✅ PASSED: Responsive design excellent across all breakpoints. Mobile (390px): All elements properly stacked and accessible. Tablet (768px): Optimal layout with proper spacing. Desktop (1920px): Full layout with grid system working perfectly. Hero section and job results both responsive."

backend:
  - task: "Job Search API"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "testing"
        comment: "Need to test /api/jobs endpoint with JSearch API integration"
      - working: true
        agent: "testing"
        comment: "✅ PASSED: Job Search API working excellently. /api/jobs endpoint successfully integrates with JSearch RapidAPI, returns 10 job opportunities with proper data structure (job titles, companies, locations, apply URLs). API response time acceptable, error handling implemented."

metadata:
  created_by: "testing_agent"
  version: "1.0"
  test_sequence: 1

test_plan:
  current_focus:
    - "Hero Section Display"
    - "Search Form Validation"
    - "Job Search Flow"
    - "Job Card Interactions"
    - "Saved Jobs Feature"
    - "Responsive Design"
  stuck_tasks: []
  test_all: true
  test_priority: "high_first"

agent_communication:
  - agent: "testing"
    message: "Starting comprehensive testing of Income Recovery job search application. Will test all frontend components, API integration, and responsive design."