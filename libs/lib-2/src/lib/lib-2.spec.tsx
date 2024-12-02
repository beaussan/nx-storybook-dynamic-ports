import { render } from '@testing-library/react';

import Lib2 from './lib-2';

describe('Lib2', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Lib2 />);
    expect(baseElement).toBeTruthy();
  });
});
