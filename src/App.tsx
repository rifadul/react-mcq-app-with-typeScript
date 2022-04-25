import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import './App.css';
import { QuestionsCard } from './components/QuestionsCard';
import { ShowResult } from './components/ShowResult';

function App() {
    return (
        <div data-testid="app-component" className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/questions/:prelang/" element={<QuestionsCard />} />
                <Route path="/result" element={<ShowResult />} />
            </Routes>
        </div>
    );
}

export default App;
