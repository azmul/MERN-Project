import React from 'react';
import { Route } from 'react-router-dom';

import Landing from '../Layout/Landing/Landing';

const Routes = (
    <div>
        <Route path="/" exact strict component={Landing} />
    </div>
)

export default Routes;