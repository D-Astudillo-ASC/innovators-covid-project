import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Constants
import * as actions from './actions';
import { routes } from './constants';

// Styles
import { CssBaseline } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

// Static/Stateless
import { NavBar, PageLayout } from './components';
// Pages
import {
  Exams,
  Admin,
  CreateExams,
  DisplayExam,
  DisplayPatientInfo,
  Welcome,
  InfoExam,
  UpdateExam,
} from './pages';

class App extends Component {
  render() {
    // TODO: maybe only need one route for Items?
    const publicViews = (
      <Switch>
        {/*
        <Route exact path={routes.ITEMS} component={Items} />
        <Route exact path={`${routes.ITEMS}/items-plain`} component={Items} />
        <Route exact path={`${routes.ITEMS}/react-table-v6`} component={Items} />
        <Route exact path={routes.ITEM_INSERT} component={ItemInsert} />
        <Route exact path={routes.ITEM_UPDATE} component={ItemUpdate} /> */}
        <Route exact path={routes.EXAMS} component={Exams} />
        <Route exact path={routes.CREATEEXAMS} component={CreateExams} />
        <Route exact path={routes.DISPLAYEXAM} component={DisplayExam} />
        <Route exact path={routes.DISPLAYPATIENT} component={DisplayPatientInfo} />
        <Route exact path={routes.HOME} component={Welcome} />
      </Switch>
    );

    return (
      <Router>
        <CssBaseline />
        <NavBar />
        <div className="app--main">
          <PageLayout />
          <div className="view-container">{publicViews}</div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
