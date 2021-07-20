import React from 'react'
import { Button, Container, Grid, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
export default function Error404() {
    return <Container>
      <Typography variant="h1" align="center">
        404
      </Typography>
      <Typography variant="subtitle1" align="center">
        Sorry, the page you visited does not exist.
      </Typography>
      <Grid container justify="center">
        <Grid item>
          <Button to="/" component={Link}>Back Home</Button>
        </Grid>
      </Grid>
    </Container>
}