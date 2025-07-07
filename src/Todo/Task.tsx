import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

interface TaskProps {
    text: string,
    isDone: boolean,
    toggleTask: () => void
}

export const Task = ({ text, isDone, toggleTask }: TaskProps) => {
    return (
        <ListItem disablePadding>
            <ListItemButton onClick={toggleTask}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={isDone}
                        tabIndex={-1}
                        disableRipple
                    />
                </ListItemIcon>
                <ListItemText 
                    primary={text} 
                    sx={{ 
                        textDecoration: isDone ? 'line-through' : 'none',
                        color: isDone ? 'text.disabled' : 'text.primary'
                    }} 
                />
            </ListItemButton>
        </ListItem>
    )
}