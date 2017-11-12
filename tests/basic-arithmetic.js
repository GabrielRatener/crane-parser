{
    const lang = language(`
        %left "+" "-"
        %left "*" "/"
        %right "^"

        e
            > \\int     => parseInt $[0]
            > "(" e ")" => $[1]
            > e "+" e   => $[0] + $[2]
            > e "-" e   => $[0] - $[2]
            > e "*" e   => $[0] * $[2]
            > e "/" e   => $[0] / $[2]
            > e "^" e   => Math.pow $[0], $[2]
    `);
    
    const parse = (text) => lang.parse(text);

    test("Single int", (api) => {
        api.eq(parse('55'), 55);
    });

    test("Binary operation", (api) => {
        api.eq(parse('1+4'), 5);
    });

    test("parentheses", (api) => {
        api.eq(parse('(1 + 4) * 3'), 15);
    });

    test("left associativity", (api) => {
        api.eq(parse('6-3+2'), 5);
    });

    test("right associativity", (api) => {
        api.eq(parse('2^3^2'), 512);
    });

    test("precedence", (api) => {
        api.eq(parse('1+3*2'), 7);
    });
}