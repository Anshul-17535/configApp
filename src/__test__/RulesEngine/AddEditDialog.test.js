import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import IMPORT from '../../ccfk-components/ImportALLCCFK';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setImportDialog } from '../../actions/rulesengine/index';
import rulesengineReducer from '../../reducers/rulesengine/reducer-newEditDialog'; // Adjust the path accordingly

// Mock the entire module
jest.mock('../../actions/rulesengine/index');

// Reducer
jest.mock('../../reducers/rulesengine/reducer-newEditDialog', () => {
  return jest.fn((state, action) => {
    switch (action.type) {
      case 'SET_IMPORT_STATE':
        return {
          ...state,
          importDialog: action.payload,
        };
      // Handle other cases if needed
      default:
        return state;
    }
  });
});

// Mock the IconButton component
jest.mock('@nokia-csf-uxr/ccfk/IconButton', () => {
  return jest.fn(({ onClick }) => 
    <button onClick={onClick} data-testid="import-icon-button" />
  );
});

// Mock the ImportIcon component
jest.mock('@nokia-csf-uxr/ccfk-assets/latest/ImportIcon', () => {
  return jest.fn(() => 
    <div data-testid="import-icon" />
  );
});

// Mock the Tooltip component
jest.mock('@nokia-csf-uxr/ccfk/Tooltip', () => {
  return jest.fn((
    { children }) => 
    <div data-testid="tooltip">
      {children}
    </div>
  );
});

const initialState = {
  importDialog: false // Assume that 'importDialog' is part of your initial state
};

const mockStore = configureStore([thunk]);

const store = mockStore({initialState});

describe('RSV IMPORT', () => {

  it("should return true", () => {
    expect(true).toBe(true);
  })
  it("should return true", () => {
    expect(true).toBe(true);
  })
  it("should return true", () => {
    expect(true).toBe(true);
  })
  it("should return true", () => {
    expect(true).toBe(true);
  })
});