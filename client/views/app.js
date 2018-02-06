import React from 'react';

import 'normalize.css';
import styles from './app.css';

const App = props => (
    <div className={styles['app-container']}>
        <div className={styles['page-container']}>
            {props.children}
        </div>
    </div>
)

export default App;