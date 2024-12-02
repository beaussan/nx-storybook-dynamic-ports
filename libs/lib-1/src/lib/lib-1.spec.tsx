import { render } from '@testing-library/react';

import Lib1 from './lib-1';

describe('Lib1', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Lib1 />);
    expect(baseElement).toBeTruthy();
  });
});
