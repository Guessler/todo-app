import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

export const Task = () => {
    return (
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <Checkbox edge="start" checked={false} />
                </ListItemIcon>
                <ListItemText primary="Тестовое задание" />
            </ListItemButton>
        </ListItem>
    )
}