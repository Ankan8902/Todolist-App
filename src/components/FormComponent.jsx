import React, { useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  ListItemSecondaryAction,
  Paper,
} from "@mui/material";
import { Typography, TextField } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { indigo } from "@mui/material/colors";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      maxWidth: "1140px",
      margin: "24px auto",
      padding: theme.spacing(2),
    },
    formContainer: {
      padding: theme.spacing(3),
    },
    heading: {
      textAlign: "center",
      color: indigo[500],
      marginBottom: theme.spacing(4),
    },
    secondColumn: {
      margin: theme.spacing(4, 0, 3, 0),
    },
    emptyMsg: {
      textAlign: "center",
      color: "grey",
      marginTop: theme.spacing(3),
    },
    ListContainer: {
      background: "white",
      padding: theme.spacing(2),
      minHeight: "300px",
      height: "auto",
    },
    ListContainerTitle: {
      paddingLeft: theme.spacing(2),
      marginBottom: theme.spacing(1),
      color: indigo[500],
    },
    remainTaskAvatar: {
      backgroundColor: indigo["A400"],
      color: "white",
    },
    completeTaskAvatar: {
      backgroundColor: "green",
      color: "white",
    },
  };
});

const FormComponent = () => {
  const { classes } = useStyles();
  const [inputData, setInputData] = useState("");
  const [inputError, setInputError] = useState("");

  const [remainingTaskList, setRemainingTaskList] = useState([]);
  const [completedTaskList, setCompletedTaskList] = useState([
    // { id: Math.random(), title: "day of the task", currentTime: "12:30 pm" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");

    if (inputData.length > 5 && inputData !== "") {
      const taskList = {
        id: Math.random(),
        title: inputData,
      };

      const list = [...remainingTaskList];
      list.push(taskList);

      //updating the task list
      setRemainingTaskList(list);
      setInputData("");
    }
  };

  const handleOnChange = ({ target }) => {
    target.value.length <= 5
      ? setInputError("Task atleast have 5 character")
      : setInputError("");
    setInputData(target.value);
  };

  const handleCheck = (id) => {
    const initial = [...remainingTaskList];
    const initialCompleteTask = [...completedTaskList];
    const currentTime = getCurrentTime(new Date());

    const Index = initial.findIndex((item) => item.id === id);
    //currentTime
    remainingTaskList[Index].currentTime = currentTime;
    initialCompleteTask.push(remainingTaskList[Index]);

    //deleting item from remaining
    const updatedRemainingTask = initial.filter((item) => item.id !== id);

    //update the complete task state
    setRemainingTaskList(updatedRemainingTask);
    setCompletedTaskList(initialCompleteTask);
  };

  const handleDelete = (id) => {
    const initial = [...remainingTaskList];
    const updated = initial.filter((item) => item.id !== id);
    setRemainingTaskList(updated);
  };

  const getCurrentTime = (date) => {
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let amPm = hour >= 12 ? "pm" : "am";

    //formatting date 12:30 pm

    hour = hour % 12;
    hour = hour ? hour : 12; //the hour "0" should be 12
    minutes = minutes < 10 ? "0" + minutes : minutes;

    let currentTime = hour + ":" + minutes + amPm;
    return currentTime;
  };

  return (
    <>
      <Box className={classes.container}>
        <Grid container>
          <Grid item xs={12}>
            <Paper elevation={3}>
              <form onSubmit={handleSubmit} className={classes.formContainer}>
                <Typography variant="h5" className={classes.heading}>
                  Todo List App
                </Typography>

                <Grid container justify="center">
                  <Grid item xs={8}>
                    <TextField
                      id="inputTaskField"
                      label="Press Enter To Add A Task"
                      variant="outlined"
                      fullWidth={true}
                      size="small"
                      value={inputData}
                      onChange={handleOnChange}
                      error={inputError ? true : false}
                      helperText={inputError}
                    />
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>

          {/* task grid container */}
          <Grid item xs={12} className={classes.secondColumn}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} lg={6}>
                <List className={classes.ListContainer} dense={true}>
                  <Typography
                    className={classes.ListContainerTitle}
                    variant="h5"
                  >
                    Remaining Task
                  </Typography>
                  {/* mapping remaining list task */}
                  {remainingTaskList.length > 0 ? (
                    remainingTaskList.map((item, i) => (
                      <ListItem key={i}>
                        <ListItemAvatar>
                          <Avatar className={classes.remainTaskAvatar}>
                            {item.title[0]}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={item.title} />
                        <ListItemSecondaryAction>
                          <IconButton
                            style={{ color: "green" }}
                            onClick={() => handleCheck(item.id)}
                          >
                            <DoneOutlineOutlinedIcon />
                          </IconButton>
                          <IconButton
                            style={{ color: "red" }}
                            onClick={() => handleDelete(item.id)}
                          >
                            <DeleteForeverOutlinedIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))
                  ) : (
                    <Typography className={classes.emptyMsg}>
                      No Task added yet!...
                    </Typography>
                  )}
                </List>
              </Grid>

              <Grid item xs={12} sm={6} lg={6}>
                <List className={classes.ListContainer} dense={true}>
                  <Typography
                    className={classes.ListContainerTitle}
                    variant="h5"
                  >
                    Completed Task
                  </Typography>
                  {/* mapping completeTaskAvatar list task */}
                  {completedTaskList.length > 0 ? (
                    completedTaskList.map((item, i) => (
                      <ListItem key={i}>
                        <ListItemAvatar>
                          <Avatar className={classes.completeTaskAvatar}>
                            {item.title[0]}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.title}
                          secondary={item.currentTime}
                        />
                      </ListItem>
                    ))
                  ) : (
                    <Typography className={classes.emptyMsg}>
                      No Task added yet!...
                    </Typography>
                  )}
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default FormComponent;
