import { Typography,makeStyles } from '@material-ui/core';
import React from 'react'
import MyTestmonialCard from "./MyTestmonialCard";

const useStyles = makeStyles({
    title:{
        fontFamily:"PDB"
    }
})
function Testmonials() {
    const classes = useStyles()
    return (
      <div>
        <Typography variant="h5" className="text-center" component="h1">
          Customers Love
        </Typography>
        <div className="test">
          <div>
            <MyTestmonialCard />
          </div>
          <div>
            <MyTestmonialCard />
          </div>
          <div>
            <MyTestmonialCard />
          </div>
        </div>
      </div>
    );
}

export default Testmonials
