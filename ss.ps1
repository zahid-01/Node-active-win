# Create a new COM object for accessing Chrome
$chrome = New-Object -ComObject Shell.Application

# Get all windows of Chrome
$windows = $chrome.Windows()

# Loop through each window
foreach ($window in $windows) {
    # Check if the window is a Chrome window
    if ($window.Name -eq "Google Chrome") {
        # Get the active tab of the Chrome window
        $tab = $window.Document.FocusedFrame

        # Get the URL of the active tab
        $url = $tab.locationURL

        # Output the URL
        Write-Host "URL of the active tab in Google Chrome: $url"
        
        # Exit the loop since we found the active tab
        break
    }
}
