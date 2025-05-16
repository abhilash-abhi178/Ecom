<?php
header('Content-Type: application/json');

// Google Client ID - update this with your actual client ID
$GOOGLE_CLIENT_ID = '1071786232789-bu287pl66hm86fo72sjbfljvjs73c7ca.apps.googleusercontent.com';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}

$id_token = $_POST['id_token'] ?? '';

if (!$id_token) {
    echo json_encode(['status' => 'error', 'message' => 'Missing ID token']);
    exit;
}

// Verify the token with Google API
$verify_url = 'https://oauth2.googleapis.com/tokeninfo?id_token=' . urlencode($id_token);

$response = file_get_contents($verify_url);
if ($response === false) {
    echo json_encode(['status' => 'error', 'message' => 'Failed to verify token']);
    exit;
}

$token_info = json_decode($response, true);

// Check token audience (client_id)
if (!isset($token_info['aud']) || $token_info['aud'] !== $GOOGLE_CLIENT_ID) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid client ID']);
    exit;
}

// Check token expiry
if (!isset($token_info['exp']) || $token_info['exp'] < time()) {
    echo json_encode(['status' => 'error', 'message' => 'Token expired']);
    exit;
}

// Extract user info
$user = [
    'id' => $token_info['sub'] ?? '',
    'email' => $token_info['email'] ?? '',
    'name' => $token_info['name'] ?? '',
    'picture' => $token_info['picture'] ?? '',
];

// You can add your user registration/login logic here,
// for example, check if user exists in DB, create session, etc.

// For demo, just return success with user info
echo json_encode([
    'status' => 'success',
    'user' => $user
]);
exit;
