import {
    Box,
    List,
    Paper,
    Button,
    Typography,
    TextField,
} from '@mui/material';

import {Task} from "./Task"

export const Todo = () => {
    return (
        <Box sx={{ maxWidth: 500, margin: '0 auto', mt: 4 }}>
            <Paper elevation={3}>
                <Typography variant="h5" component="h1" sx={{ p: 2 }}>
                    Todos
                </Typography>

                <Box sx={{ px: 2, pb: 1, display: 'flex', gap: 1 }}>
                    <TextField
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
                        variant="contained"
                        color="primary"
                        sx={{ whiteSpace: 'nowrap' }}
                    >
                        Add
                    </Button>
                </Box>

                <List>
                    <Task/>
                </List>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 2,
                    py: 1
                }}>
                    <Typography variant="body2" color="text.secondary">
                        2 items left
                    </Typography>

                    <Box sx={{ gap: 1, display: "flex" }}>
                        <Button size="small" sx={{ minWidth: 0, padding: '4px 8px', fontSize: 12 }}>All</Button>
                        <Button size="small" sx={{ minWidth: 0, padding: '4px 8px', fontSize: 12 }}>Active</Button>
                        <Button size="small" sx={{ minWidth: 0, padding: '4px 8px', fontSize: 12 }}>Completed</Button>
                    </Box>

                    <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                        Clear completed
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};