import React from 'react';
import { Route } from 'react-router-dom';

import Home from '../Home/Home';

const Routes = (
    <div>
        <Route path="/" exact strict component={Home} />
    </div>
)

export default Routes;