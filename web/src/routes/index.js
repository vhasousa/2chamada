import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Entregas from '../pages/Entregas';
import Cadastrar from '../pages/Cadastrar';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Entregas} />
      <Route path="/cadastrar" component={Cadastrar} />
    </Switch>
  );
}
