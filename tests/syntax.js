{    
    test("Reduce indentation", (api) => {
        const lang = language(`
            %left "+" "-"
            %left "*" "/"
            %right "^"

            e
                > \\int     => parseInt $[0]
                > e "+" e   =>
                    $[0] + $[2]
                > "(" e ")" =>
                    $[1]
                > e "-" e   => $[0] - $[2]
                > e "*" e   => $[0] * $[2]
                > e "/" e   =>
                    $[0] / $[2]
                > e "^" e   => Math.pow $[0], $[2]
        `);

        api.eq(lang.parse('1 * 4 + (3 * 2) ^ 2 - 2'), 38);
        api.eq(lang.parse('3 * 4 + (3 * 2) ^ 2 / 3'), 24);
    });

    test("Slash strings", (api) => {
        const lang = language(`
            %left "+" "-"
            %left \\* \\/
            %right \\^

            e
                > \\int     => parseInt $[0]
                > "(" e ")" =>
                    $[1]
                > e "+" e   =>
                    $[0] + $[2]
                > e \\- e   => $[0] - $[2]
                > e "*" e   => $[0] * $[2]
                > e "/" e   =>
                    $[0] / $[2]
                > e \\^ e   => Math.pow $[0], $[2]
        `);

        api.eq(lang.parse('3 * 5 + (2 * 2) ^ (2 + 1) - 2'), 77);
    });


    test("Single/double quoted strings", (api) => {
        const lang = language(`
            %left "+" "-"
            %left "*" '/'
            %right \\^

            e
                > 'int'     => parseInt $[0]
                > "(" e ")" =>
                    $[1]
                > e "+" e   =>
                    $[0] + $[2]
                > e '-' e   => $[0] - $[2]
                > e "*" e   => $[0] * $[2]
                > e "/" e   =>
                    $[0] / $[2]
                > e "^" e   => Math.pow $[0], $[2]
        `);

        api.eq(lang.parse('3 * 5 + (2 * 2) ^ (2 + 1) - 2'), 77);
    });
}