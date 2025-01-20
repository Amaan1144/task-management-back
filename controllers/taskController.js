const db = require('../config/db');

exports.addTask = (req, res, io) => {
    const { name, status } = req.body;
    const sqlInsert = 'INSERT INTO tasks (name, status) VALUES (?, ?)';
    
    db.query(sqlInsert, [name, status], (err, result) => {
        if (err) return res.status(500).send(err);

        const insertedId = result.insertId;
        const sqlSelect = 'SELECT id, name, status, created_at FROM tasks WHERE id = ?';
        db.query(sqlSelect, [insertedId], (err, rows) => {
            if (err) return res.status(500).send(err);

            const newTask = rows[0];
            io.emit('taskAdded', newTask);
            res.status(201).json({ message: 'Task Added Successfully' });
        });
    });
};


exports.getTasks = (req, res)=> {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
}

exports.updateTask = (req, res, io)=> {
    const { id } = req.params;
    const { status } = req.body;
    const sql = 'UPDATE tasks SET status = ? WHERE id = ?';
    db.query(sql, [status, id], (err, result) => {
        if (err) return res.status(500).send(err);
        io.emit('taskUpdated', { id, status });
        res.send('Task updated successfully');
    });
}

exports.deleteTask = (req, res, io)=> {
    const { id } = req.params;
    const sql = 'DELETE FROM tasks WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        io.emit('taskDeleted', { id });
        res.send('Task deleted successfully');
    });
}