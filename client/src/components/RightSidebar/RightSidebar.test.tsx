<<<<<<< HEAD
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import { fireEvent, getByTestId, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RightSidebar, { RightSidebarProps } from './RightSidebar';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';



test('RightSidebar renders correctly', () => {
    const { getByText } = render(<RightSidebar />);
    getByText('show details');
});

test('Author shows', () => {
    const { getByTestId } = render(<RightSidebar />);
    getByTestId('author-testid');
});



// describe("<RightSidebar />", () => {
//     test("should display a blank login form, with remember me checked by default", async () => {
//       // ???
//     });
//   });

//typescript ignore test files GOOGLE
//search should be case insensitive
=======
import { fireEvent, render, getByText } from '@testing-library/react';
import RightSidebar from './RightSidebar';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
test('Right renders correctly', () => {
  const { getByText } = render(<RightSidebar />);
  getByText('show details');
});
>>>>>>> master
