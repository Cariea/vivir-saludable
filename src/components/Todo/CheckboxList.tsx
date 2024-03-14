import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import {Assignments} from "@/types";
import { updateDailyAssigmentStatus } from '@/actions/putActions';

export default function CheckboxList(props: {assignments: Assignments[], specialty: string}) {
  const [currentAssigments, setAssigments] = React.useState<Assignments[]>(props.assignments);

  const handleToggle = (value: number) => () =>{
    const index = currentAssigments.findIndex((assigment) => assigment.recordId === value);
    const newAssigments = [...currentAssigments];
    newAssigments[index].completed = !newAssigments[index].completed;
    setAssigments(newAssigments);
    updateAssigment(value, newAssigments[index].completed);
    
  }
  const doNothing = () => {
    return;
  }

  const updateAssigment = (recordId: number, status: boolean) => {
    updateDailyAssigmentStatus(recordId, status);
  }

  const assigmentsSpecialistQuantity = (specialty: string) => {
    return props.assignments.filter((assigment) => assigment.specialty === specialty).length;
  }

  React.useEffect(() => {
    setAssigments(props.assignments);
  }, [props.assignments]);


  return (
    <List  className=' overflow-y-scroll overflow-x-hidden  ' sx={{ width: '100%', maxWidth: 380}}>
      
        {props.assignments.map((assigment) => {
          if(assigment.specialty !== props.specialty) return;
          const labelId = `checkbox-list-label-${assigment.recordId}`;

          return (
            <ListItem
              key={assigment.recordId}
              disablePadding
            sx={assigment.completed ? {backgroundColor: 'rgba(0, 255, 0, 0.2)'} : {backgroundColor: 'rgba(255, 0, 0, 0.2)'}}
            className='rounded-3xl m-2 ml-0'
            >
              <ListItemButton role={undefined} onClick={!assigment.completed ? handleToggle(assigment.recordId) : handleToggle(assigment.recordId) } dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={assigment.completed}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>
                <ListItemText id={labelId} primary={assigment.description} />
                    <p>{assigment.completed ? 'Completado' : 'Pendiente'}</p>
              </ListItemButton>
            </ListItem>
          );
        })}
    </List>
  );
}
