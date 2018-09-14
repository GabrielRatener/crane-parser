{
    const prePrec = language(`
        %left "+" "-"
        %left "*" "/" "%"
        %none unary
        %right "^"

        e
            > \\int     => parseInt $[0]
            > "(" e ")" => $[1]
            > e "+" e   => $[0] + $[2]
            > e "-" e   => $[0] - $[2]
            > e "*" e   => $[0] * $[2]
            > e "/" e   => $[0] / $[2]
            > e "^" e   => Math.pow $[0], $[2]
            > e "%" e   => $[0] % $[2]

            %prec unary
            > "%" e   => $[1] % 100


            %prec unary
            > "-" e     => -1 * $[1]
            
            %prec unary
            > "+" e     => 1 * $[1]
    `);
    
    const postPrec = language(`
        %none unary
        %left "+" "-"
        %left "*" "/" "%"
        %right "^"

        e
            > \\int     => parseInt $[0]
            > "(" e ")" => $[1]
            > e "+" e   => $[0] + $[2]
            > e "-" e   => $[0] - $[2]
            > e "*" e   => $[0] * $[2]
            > e "/" e   => $[0] / $[2]
            > e "^" e   => Math.pow $[0], $[2]
            > e "%" e   => $[0] % $[2]

            # unary mod 100 operator is used to test precedence
            %prec unary
            > "%" e   => $[1] % 100


            %prec unary
            > "-" e     => -1 * $[1]
            
            %prec unary
            > "+" e     => 1 * $[1]
    `);
    
    const parse = (text, prec = true) => prec ? prePrec.parse(text) : postPrec.parse(text);

    test("Unary works", (api) => {
        api.eq(parse('55 + -4'), 51);
        api.eq(parse('20 * -4'), -80);
    });

    test("Unary precedence", (api) => {
        api.eq(parse('- 4 + 2'), -2);
        api.eq(parse('% 107 % 21'), 7);
        api.eq(parse('- 4 + 2', false), -2);
        api.eq(parse('% 107 % 21', false), 7);
    });
}