import {describe, expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import Review from './components/products/checkoutform/checkout/Review';



describe("Cart component", () => {
    test("XCM should always be in the header", () => {
        render(<Review/>)
        const element = screen.getByText(/Order summary/i)
        expect(element).toBeDefined()
    });
    
});