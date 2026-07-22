5<?php
require_once 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $actividad = $_POST['actividad'];
    $mensaje = $_POST['mensaje'];

    $stmt = $conn->prepare("INSERT INTO voluntarios (nombre, correo, actividad, mensaje) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $nombre, $correo, $actividad, $mensaje);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "¡Registro exitoso!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al registrar."]);
    }

    $stmt->close();
    $conn->close();
}
?>