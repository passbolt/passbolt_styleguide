import React from "react";
import {Switch, withRouter} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import PropTypes from "prop-types";

class AnimatedSwitch extends React.Component {
  constructor(props) {
    super(props);
    this._previousLocationPathname = "";
    this._previousTransition = "";
  }

  getTransition(currentLocationPath) {
    let transition = null;

    // Resource view transition
    if (currentLocationPath.indexOf("/webAccessibleResources/quickaccess/resources/view") !== -1 && this._previousLocationPathname === "/webAccessibleResources/quickaccess/home") {
      transition = "slideLeft";
    } else if (currentLocationPath === "/webAccessibleResources/quickaccess/home" && this._previousLocationPathname.indexOf("/webAccessibleResources/quickaccess/resources/view") !== -1) {
      transition = "slideRight";
    } else if (currentLocationPath === "/webAccessibleResources/quickaccess/resources/create" && this._previousLocationPathname === "/webAccessibleResources/quickaccess/resources/generate-password") {
      // Resource create transition
      transition = "slideRight";
    } else if (currentLocationPath === "/webAccessibleResources/quickaccess/resources/create") {
      transition = "slideLeft";
    } else if (currentLocationPath.indexOf("/webAccessibleResources/quickaccess/resources/view") !== -1 && this._previousLocationPathname === "/webAccessibleResources/quickaccess/resources/create") {
      transition = "slideLeft";
    } else if (currentLocationPath === "/webAccessibleResources/quickaccess/resources/generate-password" && this._previousLocationPathname === "/webAccessibleResources/quickaccess/resources/create") {
      transition = "slideLeft";
    } else if (this._previousLocationPathname === "/webAccessibleResources/quickaccess/resources/create") {
      // Whatever current location is, if the previous location was the resource create page then slide right
      transition = "slideRight";
    } else if (currentLocationPath === "/webAccessibleResources/quickaccess/resources/group" && this._previousLocationPathname === "/webAccessibleResources/quickaccess/home") {
      // Filter by group transitions
      transition = "slideLeft";
    } else if (currentLocationPath === "/webAccessibleResources/quickaccess/home" && this._previousLocationPathname === "/webAccessibleResources/quickaccess/resources/group") {
      transition = "slideRight";
    } else if (currentLocationPath === "/webAccessibleResources/quickaccess/home" && this._previousLocationPathname.indexOf("/webAccessibleResources/quickaccess/resources/group/") !== -1) {
      transition = "slideRight";
    } else if (currentLocationPath.indexOf("/webAccessibleResources/quickaccess/resources/group/") !== -1 && this._previousLocationPathname === "/webAccessibleResources/quickaccess/resources/group") {
      transition = "slideLeft";
    } else if (currentLocationPath === "/webAccessibleResources/quickaccess/resources/group" && this._previousLocationPathname.indexOf("/webAccessibleResources/quickaccess/resources/group/") !== -1) {
      transition = "slideRight";
    } else if (currentLocationPath.indexOf("/webAccessibleResources/quickaccess/resources/view") !== -1 && this._previousLocationPathname.indexOf("/webAccessibleResources/quickaccess/resources/group") !== -1) {
      transition = "slideLeft";
    } else if (currentLocationPath.indexOf("/webAccessibleResources/quickaccess/resources/group/") !== -1 && this._previousLocationPathname.indexOf("/webAccessibleResources/quickaccess/resources/view") !== -1) {
      transition = "slideRight";
    } else if (currentLocationPath === "/webAccessibleResources/quickaccess/resources/tag" && this._previousLocationPathname === "/webAccessibleResources/quickaccess/home") {
      // Filter by tag transitions
      transition = "slideLeft";
    } else if (currentLocationPath === "/webAccessibleResources/quickaccess/home" && this._previousLocationPathname === "/webAccessibleResources/quickaccess/resources/tag") {
      transition = "slideRight";
    } else if (currentLocationPath === "/webAccessibleResources/quickaccess/home" && this._previousLocationPathname.indexOf("/webAccessibleResources/quickaccess/resources/tag/") !== -1) {
      transition = "slideRight";
    } else if (currentLocationPath.indexOf("/webAccessibleResources/quickaccess/resources/tag/") !== -1 && this._previousLocationPathname === "/webAccessibleResources/quickaccess/resources/tag") {
      transition = "slideLeft";
    } else if (currentLocationPath === "/webAccessibleResources/quickaccess/resources/tag" && this._previousLocationPathname.indexOf("/webAccessibleResources/quickaccess/resources/tag/") !== -1) {
      transition = "slideRight";
    } else if (currentLocationPath.indexOf("/webAccessibleResources/quickaccess/resources/view") !== -1 && this._previousLocationPathname.indexOf("/webAccessibleResources/quickaccess/resources/tag") !== -1) {
      transition = "slideLeft";
    } else if (currentLocationPath.indexOf("/webAccessibleResources/quickaccess/resources/tag/") !== -1 && this._previousLocationPathname.indexOf("/webAccessibleResources/quickaccess/resources/view") !== -1) {
      transition = "slideRight";
    } else if (currentLocationPath === "/webAccessibleResources/quickaccess/more-filters" && this._previousLocationPathname === "/webAccessibleResources/quickaccess/home") {
      // More filters transitions
      transition = "slideLeft";
    } else if (currentLocationPath === "/webAccessibleResources/quickaccess/home" && this._previousLocationPathname === "/webAccessibleResources/quickaccess/more-filters") {
      transition = "slideRight";
    } else if (currentLocationPath === "/webAccessibleResources/quickaccess/resources/favorite" && this._previousLocationPathname === "/webAccessibleResources/quickaccess/more-filters") {
      // Filter by favorite transitions
      transition = "slideLeft";
    } else if (currentLocationPath === "/webAccessibleResources/quickaccess/more-filters" && this._previousLocationPathname === "/webAccessibleResources/quickaccess/resources/favorite") {
      transition = "slideRight";
    } else if (currentLocationPath === "/webAccessibleResources/quickaccess/home" && this._previousLocationPathname === "/webAccessibleResources/quickaccess/resources/favorite") {
      transition = "slideRight";
    } else if (currentLocationPath.indexOf("/webAccessibleResources/quickaccess/resources/view") !== -1 && this._previousLocationPathname.indexOf("/webAccessibleResources/quickaccess/resources/favorite") !== -1) {
      transition = "slideLeft";
    } else if (currentLocationPath.indexOf("/webAccessibleResources/quickaccess/resources/favorite") !== -1 && this._previousLocationPathname.indexOf("/webAccessibleResources/quickaccess/resources/view") !== -1) {
      transition = "slideRight";
    } else if (currentLocationPath === "/webAccessibleResources/quickaccess/resources/owned-by-me" && this._previousLocationPathname === "/webAccessibleResources/quickaccess/more-filters") {
      // Filter by items I own transitions
      transition = "slideLeft";
    } else if (currentLocationPath === "/webAccessibleResources/quickaccess/more-filters" && this._previousLocationPathname === "/webAccessibleResources/quickaccess/resources/owned-by-me") {
      transition = "slideRight";
    } else if (currentLocationPath === "/webAccessibleResources/quickaccess/home" && this._previousLocationPathname === "/webAccessibleResources/quickaccess/resources/owned-by-me") {
      transition = "slideRight";
    } else if (currentLocationPath.indexOf("/webAccessibleResources/quickaccess/resources/view") !== -1 && this._previousLocationPathname.indexOf("/webAccessibleResources/quickaccess/resources/owned-by-me") !== -1) {
      transition = "slideLeft";
    } else if (currentLocationPath.indexOf("/webAccessibleResources/quickaccess/resources/owned-by-me") !== -1 && this._previousLocationPathname.indexOf("/webAccessibleResources/quickaccess/resources/view") !== -1) {
      transition = "slideRight";
    } else if (currentLocationPath === "/webAccessibleResources/quickaccess/resources/recently-modified" && this._previousLocationPathname === "/webAccessibleResources/quickaccess/more-filters") {
      // Filter by modified transitions
      transition = "slideLeft";
    } else if (currentLocationPath === "/webAccessibleResources/quickaccess/more-filters" && this._previousLocationPathname === "/webAccessibleResources/quickaccess/resources/recently-modified") {
      transition = "slideRight";
    } else if (currentLocationPath === "/webAccessibleResources/quickaccess/home" && this._previousLocationPathname === "/webAccessibleResources/quickaccess/resources/recently-modified") {
      transition = "slideRight";
    } else if (currentLocationPath.indexOf("/webAccessibleResources/quickaccess/resources/view") !== -1 && this._previousLocationPathname.indexOf("/webAccessibleResources/quickaccess/resources/recently-modified") !== -1) {
      transition = "slideLeft";
    } else if (currentLocationPath.indexOf("/webAccessibleResources/quickaccess/resources/recently-modified") !== -1 && this._previousLocationPathname.indexOf("/webAccessibleResources/quickaccess/resources/view") !== -1) {
      transition = "slideRight";
    } else if (currentLocationPath === "/webAccessibleResources/quickaccess/resources/shared-with-me" && this._previousLocationPathname === "/webAccessibleResources/quickaccess/more-filters") {
      // Filter by modified transitions
      transition = "slideLeft";
    } else if (currentLocationPath === "/webAccessibleResources/quickaccess/more-filters" && this._previousLocationPathname === "/webAccessibleResources/quickaccess/resources/shared-with-me") {
      transition = "slideRight";
    } else if (currentLocationPath === "/webAccessibleResources/quickaccess/home" && this._previousLocationPathname === "/webAccessibleResources/quickaccess/resources/shared-with-me") {
      transition = "slideRight";
    } else if (currentLocationPath.indexOf("/webAccessibleResources/quickaccess/resources/view") !== -1 && this._previousLocationPathname.indexOf("/webAccessibleResources/quickaccess/resources/shared-with-me") !== -1) {
      transition = "slideLeft";
    } else if (currentLocationPath.indexOf("/webAccessibleResources/quickaccess/resources/shared-with-me") !== -1 && this._previousLocationPathname.indexOf("/webAccessibleResources/quickaccess/resources/view") !== -1) {
      transition = "slideRight";
    } else {
      /*
       * The page has changed but no transition has been defined for it.
       * Use the default noTransition transition
       */
      if (currentLocationPath !== this._previousLocationPathname) {
        transition = "slideNoTransition";
      } else {
        /*
         * The transition is recalculated because of a status change.
         * Return the previous transition. The transition won't be played twice, and it will allow to complete it properly.
         */
        transition = this._previousTransition;
      }
    }

    this._previousTransition = transition;
    return transition;
  }

  render() {
    const {children} = this.props;
    const currentLocationPathname = this.props.location.pathname;
    const transition = this.getTransition(currentLocationPathname, this._previousLocationPathname);
    // If no transition, the previous component should be hidden immediately.
    const transitionTimeout = transition !== "slideNoTransition" ? 210 : 0;
    this._previousLocationPathname = currentLocationPathname;

    return (
      <TransitionGroup enter={true} exit={true}>
        <CSSTransition classNames={transition} key={currentLocationPathname} timeout={transitionTimeout}>
          <Switch location={this.props.location}>{children}</Switch>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

AnimatedSwitch.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  // Match, location and history props are injected by the withRouter decoration call.
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(AnimatedSwitch);
