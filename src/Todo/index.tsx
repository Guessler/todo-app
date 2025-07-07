import {
    Box,
    List,
    Paper,
    Button,
    Typography,
    TextField,
} from '@mui/material';
import { Task } from "./Task";
import { useState, useEffect } from 'react';

interface TodoTasksProps {
    id: number;
    title: string;
    isDone: boolean;
}

type FilterType = "all" | "active" | "completed";

const STORAGE_KEY = 'todo-tasks';

export const Todo = () => {
    const [value, setValue] = useState<string>('');
    const [tasks, setTasks] = useState<TodoTasksProps[]>(() => {
        
        const savedTasks = localStorage.getItem(STORAGE_KEY);
        if (savedTasks) {
            return JSON.parse(savedTasks);
        }
        return [
            {
                id: 1,
                title: "Тестовое задание",
                isDone: true
            },
            {
                id: 2,
                title: "Прекрасный код",
                isDone: true
            },
            {
                id: 3,
                title: "Покрытие тестами",
                isDone: false
            }
        ];
    });

    const [filter, setFilter] = useState<FilterType>("all");

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = () => {
        if (!value.trim()) return;

        const task = {
            id: Date.now(),
            title: value,
            isDone: false
        };

        setTasks([...tasks, task]);
        setValue('');
    };

    const toggleTask = (id: number) => {
        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, isDone: !task.isDone } : task
            )
        );
    };

    const handleClearCompleted = () => {
        setTasks(tasks.filter(task => !task.isDone));
    };

    const getFilteredTasks = () => {
        switch (filter) {
            case "active":
                return tasks.filter(task => !task.isDone);
            case "completed":
                return tasks.filter(task => task.isDone);
            default:
                return tasks;
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    };

    const filteredTasks = getFilteredTasks();

    return (
        <Box sx={{ maxWidth: 500, margin: '0 auto', mt: 4 }}>
            <Paper elevation={3}>
                <Typography variant="h5" component="h1" sx={{ p: 2 }}>
                    Todos
                </Typography>

                <Box sx={{ px: 2, pb: 1, display: 'flex', gap: 1 }}>
                    <TextField
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        fullWidth
                        variant="outlined"
                        placeholder="What needs to be done?"
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '4px',
                            }
                        }}
                    />
                    <Button
                        onClick={handleAddTask}
                        variant="contained"
                        color="primary"
                        sx={{ whiteSpace: 'nowrap' }}
                    >
                        Add
                    </Button>
                </Box>

                {filteredTasks.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>
                        <Typography variant="body1">Задач нет</Typography>
                    </Box>
                ) : (
                    <List>
                        {filteredTasks.map((item) => (
                            <Task
                                key={item.id}
                                text={item.title}
                                isDone={item.isDone}
                                toggleTask={() => toggleTask(item.id)}
                            />
                        ))}
                    </List>
                )}

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 2,
                    py: 1
                }}>
                    <Typography variant="body2" color="text.secondary">
                        {tasks.filter(task => !task.isDone).length} items left
                    </Typography>

                    <Box sx={{ gap: 1, display: "flex" }}>
                        <Button
                            size="small"
                            sx={{
                                minWidth: 0,
                                padding: '4px 8px',
                                fontSize: 12,
                                fontWeight: filter === 'all' ? 'bold' : 'normal'
                            }}
                            onClick={() => setFilter("all")}
                        >
                            All
                        </Button>
                        <Button
                            size="small"
                            sx={{
                                minWidth: 0,
                                padding: '4px 8px',
                                fontSize: 12,
                                fontWeight: filter === 'active' ? 'bold' : 'normal'
                            }}
                            onClick={() => setFilter("active")}
                        >
                            Active
                        </Button>
                        <Button
                            size="small"
                            sx={{
                                minWidth: 0,
                                padding: '4px 8px',
                                fontSize: 12,
                                fontWeight: filter === 'completed' ? 'bold' : 'normal'
                            }}
                            onClick={() => setFilter("completed")}
                        >
                            Completed
                        </Button>
                    </Box>

                    <Typography
                        onClick={handleClearCompleted}
                        variant="body2"
                        color="primary"
                        sx={{ cursor: 'pointer' }}
                    >
                        Clear completed
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};