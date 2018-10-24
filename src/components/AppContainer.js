import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'

export default class AppContainer extends Component {

  render() {
    return (
      <Grid container>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              { this.props.title }
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid item xs={12} lg={12} md={12}>
          { this.props.children && this.props.children }
        </Grid>
      </Grid>
    )
  }
}
