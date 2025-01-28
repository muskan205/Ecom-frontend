import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
export const CommonListItem = ({ icon, title, onClick, subItems }) => {
    return (
      <List>
        <ListItemButton onClick={onClick}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItemButton>
        {subItems && (
          <Collapse in={true} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {subItems.map((item, index) => (
                <ListItemButton key={index} sx={{ pl: 4 }} onClick={() => onClick(item.path)}>
                  <ListItemIcon>
                    <AddCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        )}
      </List>
    );
  };
  