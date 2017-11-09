SELECT COUNT(*) FROM vehicles 
JOIN users ON vehicles.owner_id = users.id
WHERE users.id = $1;