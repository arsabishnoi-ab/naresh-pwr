# Copy generated and fallback images to website\images

$brainDir = "C:\Users\arsab\.gemini\antigravity\brain\ef0737a2-49e7-40fc-a167-339c23721edb"
$destDir = "d:\projects\NARESH PWR\website\images"
$clientDir = "d:\projects\NARESH PWR\client-assets\images"

if (!(Test-Path $destDir)) {
    New-Item -ItemType Directory -Force -Path $destDir
}

# 1. AI-Generated images (3 generated successfully before rate limit)
Copy-Item "$brainDir\ss_304_gate_1791610643690.jpg" "$destDir\ss_304_gate.jpg" -Force
Copy-Item "$brainDir\ss_hand_railing_1791610732664.jpg" "$destDir\ss_hand_railing.jpg" -Force
Copy-Item "$brainDir\ss_table_1791610756109.jpg" "$destDir\ss_table.jpg" -Force

# 2. Original reference images (fallback for quota exhausted items)
Copy-Item "$clientDir\4_sunlight_glass.jpg" "$destDir\sunlight_glass.jpg" -Force
Copy-Item "$clientDir\5_wooden_railing.jpg" "$destDir\wooden_railing.jpg" -Force
Copy-Item "$clientDir\aluminium_glass_railing.jpeg" "$destDir\aluminium_glass_railing.jpg" -Force
Copy-Item "$clientDir\bathroom_partition_glass.jpeg" "$destDir\bathroom_partition_glass.jpg" -Force
Copy-Item "$clientDir\bathroom_shower_glass.jpeg" "$destDir\bathroom_shower_glass.jpg" -Force

Write-Host "Images copied successfully!"
