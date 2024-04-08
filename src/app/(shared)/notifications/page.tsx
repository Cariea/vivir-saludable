'use client';
import Navbar from "@/components/Navbar";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import { getAlerts } from "@/actions/getActions";
import { alert } from "@/components/Navbar";
import { Fragment, useContext, useEffect, useState } from "react";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import {updateStatusAlert} from "@/actions/putActions";
import { SessionCookiesContext } from "@/contexts";
import Badge from '@mui/material/Badge';
export default function NotificationsPage() {
  const [alerts, setAlerts] = useState<alert[]>([]);
  const cookie = useContext(SessionCookiesContext);


  const fetchAlerts = async () => {
    const response = await getAlerts();
    if (response.status === 200) {
        setAlerts(response.data);
        response.data.forEach(async (alert:alert) => {
          if (!alert.confirmed && alert.userReceptor === JSON.parse(cookie.value).id){
            await updateStatusAlert(alert.alertId);
          }
        });
    }
  }
  useEffect(() => {
    fetchAlerts();
  }, [])

  return (
        <>
          <List sx={{ width: '100%' }}>
        <div style={{ maxHeight: 'calc(100vh - 9.3rem)', overflowY: 'auto' }}>
            {alerts.map((alert) => (
            <ListItem key={alert.alertId} alignItems="flex-start" sx={{marginBottom:1,  bgcolor: 'background.paper' }}>
              <Badge color="secondary" variant="dot" anchorOrigin={{vertical: 'top', horizontal: 'left'}} invisible={alert.confirmed}>
              <ListItemAvatar>
                {alert.type === 'warning' ? <WarningAmberIcon /> : <ThumbUpOffAltIcon color="primary"/>}
              </ListItemAvatar>
              </Badge>
              <ListItemText
                primary={alert.type === 'warning' ? 'Advertencia' : 'Felicitaciones'}
                secondary={
                  <>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {alert.name}
                    </Typography >
                    <Typography component="div" variant="body2" sx={{ wordBreak: 'break-all' }}>
                      {` Dice: ${alert.alert}`}
                    </Typography>
                    <Typography component="div" variant="body2" sx={{ justifyContent: 'flex-end', textAlign: 'end' }}>
                      {`Recibido el: ${alert.createdAt}`}
                    </Typography>
                  </>
                }
              />
            </ListItem >
            ))}
            </div>
          </List>
          <Navbar />
        </>
  )
}
