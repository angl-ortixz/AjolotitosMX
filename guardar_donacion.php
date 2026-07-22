<?php
// Configuración para devolver respuesta JSON
header('Content-Type: application/json');

// Incluir conexión a la base de datos
require_once 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Validar que los campos existan y no estén vacíos
    $nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
    $fecha  = isset($_POST['fecha']) ? trim($_POST['fecha']) : '';
    $monto  = isset($_POST['monto']) ? floatval($_POST['monto']) : 0;

    if (empty($nombre) || empty($fecha) || $monto <= 0) {
        echo json_encode([
            "status" => "error", 
            "message" => "Por favor llena todos los campos correctamente."
        ]);
        exit;
    }

    // Preparar la consulta SQL
    $stmt = $conn->prepare("INSERT INTO donaciones (nombre, fecha, monto) VALUES (?, ?, ?)");
    $stmt->bind_param("ssd", $nombre, $fecha, $monto);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success", 
            "message" => "¡Muchas gracias por tu donación!"
        ]);
    } else {
        echo json_encode([
            "status" => "error", 
            "message" => "Error al registrar en la base de datos: " . $stmt->error
        ]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode([
        "status" => "error", 
        "message" => "Método no permitido."
    ]);
}
?>