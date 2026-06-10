import pandas as pd
import os

# Create datasets directory
os.makedirs('../datasets', exist_ok=True)

# 1. Mock Colleges
colleges_data = {
    'College Name': [
        'Government Arts College',
        'Government Engineering College',
        'National Institute of Science',
        'State Commerce College',
        'City Women College'
    ],
    'District': ['Chennai', 'Coimbatore', 'Madurai', 'Chennai', 'Coimbatore'],
    'State': ['Tamil Nadu', 'Tamil Nadu', 'Tamil Nadu', 'Tamil Nadu', 'Tamil Nadu'],
    'Available Courses': [
        'B.A. English, B.A. History',
        'B.Tech AI & DS, B.E. Computer Science',
        'B.Sc Physics, B.Sc Computer Science',
        'B.Com, BBA',
        'B.A. Economics, B.Sc Mathematics'
    ],
    'Facilities': ['Hostel, Library', 'Hostel, Labs, WiFi', 'Labs, Library', 'Library, Canteen', 'Hostel, Library, Sports'],
    'Cutoff': [70, 90, 85, 75, 65],
    'Eligibility': ['12th Pass', '12th Science with PCM', '12th Science', '12th Commerce', '12th Pass']
}
pd.DataFrame(colleges_data).to_excel('../datasets/colleges.xlsx', index=False)

# 2. Mock Courses
courses_data = {
    'Course Name': [
        'B.Tech AI & DS',
        'B.E. Computer Science',
        'B.Sc Computer Science',
        'B.Sc Physics',
        'B.Com',
        'BBA',
        'B.A. English'
    ],
    'Stream Required': ['Science', 'Science', 'Science', 'Science', 'Commerce', 'Any', 'Arts/Any'],
    'Required Subjects': ['Physics, Chemistry, Mathematics', 'Physics, Chemistry, Mathematics', 'Mathematics', 'Physics', 'Accountancy', 'None', 'English'],
    'Minimum Marks': [80, 75, 70, 60, 65, 50, 50]
}
pd.DataFrame(courses_data).to_excel('../datasets/courses.xlsx', index=False)

# 3. Mock Scholarships
scholarships_data = {
    'Scholarship Name': [
        'State Merit Scholarship',
        'Women Empowerment Scheme',
        'Minority Welfare Scholarship',
        'EWS Higher Education Fund',
        'Tech Talent Scholarship'
    ],
    'Amount': [50000, 30000, 25000, 40000, 100000],
    'Category': ['General', 'All', 'Minority', 'General', 'All'],
    'Gender': ['All', 'Female', 'All', 'All', 'All'],
    'Max Family Income': [500000, 800000, 600000, 250000, 1000000],
    'Min Academic Score': [90, 75, 70, 80, 95],
    'State': ['Tamil Nadu', 'All', 'All', 'Tamil Nadu', 'All'],
    'Deadline': ['2026-08-30', '2026-09-15', '2026-07-31', '2026-10-01', '2026-11-30']
}
pd.DataFrame(scholarships_data).to_excel('../datasets/Scholarship.xlsx', index=False)

print("Mock datasets generated successfully in ../datasets/")
