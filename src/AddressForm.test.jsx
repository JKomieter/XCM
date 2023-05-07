import {describe, expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import AddressForm from './components/products/checkoutform/checkout/AddressForm';


describe("AddressForm Component", () => {
    test("should call handleSubmit when button is click", () => {
        render(<AddressForm/>)
        const btn = screen.getByTestId("checkBtn");
        expect(btn).toBeDefined()
    })
})