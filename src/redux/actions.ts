export const REQUEST_APPS = "REQUEST_APPS";
export const RECEIVE_APPS = "RECEIVE_APPS";

function requestApps() {
  return {
    type: REQUEST_APPS,
  };
}

function receiveApps(json: any) {
  return {
    type: RECEIVE_APPS,
    apps: json,
  };
}

function fetchApps() {
  return (dispatch: any) => {
    dispatch(requestApps());
    return fetch(`assets/data.json`)
      .then((response) => response.json())
      .then((json) => dispatch(receiveApps(json)));
  };
}

function shouldFetchApps(state: any) {
  const apps = state.apps;
  if (apps.length == 0) {
    return true;
  } else if (state.isFetching) {
    return false;
  }
}

export function fetchAppsIfNeeded() {
  return (dispatch: any, getState: any) => {
    if (shouldFetchApps(getState())) {
      return dispatch(fetchApps());
    }
  };
}
