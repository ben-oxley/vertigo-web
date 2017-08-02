# Vertigo

This project analyses vertigo datalogger files and acts as a first pass data analysis option for looking at files.

## TODO
- Parse datalogger files
    - Add new graph types
    - Add map
- Add live bluetooth connection
- Add 3D view to show live position of datalogger

## Build
When first run, use "npm install" to install the package dependencies and "dotnet restore" to restore nuget dependencies.
Build to web app via dotnet publish --configuration Release --framework netcoreapp1.1
More guidance at: http://docs.aws.amazon.com/toolkit-for-visual-studio/latest/user-guide/deployment-beanstalk-custom-netcore.html
