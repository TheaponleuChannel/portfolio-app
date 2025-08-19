import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const Noir = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
            950: '{blue.950}'
        },
        formField: {
            paddingX: '0.5rem',
            paddingY: '0.5rem',
            borderRadius: '0.5rem',
            focusPaddingX: '0.5rem',
            focusPaddingY: '0.5rem',
            focusBorderRadius: '0.5rem',
            hoverPaddingX: '0.5rem',
            hoverPaddingY: '0.5rem',
            hoverBorderRadius: '0.5rem'
        },
        colorScheme: {
            light: {
                primary: {
                color: '{primary.500}',
                contrastColor: '#ffffff',
                hoverColor: '{primary.500}',
                activeColor: '{primary.800}'
                },
                highlight: {
                background: '{primary.500}',
                focusBackground: '{primary.700}',
                color: '#ffffff',
                focusColor: '#ffffff'
                },
            },
            dark: {
                primary: {
                    color: '{primary.500}',
                    contrastColor: '{primary.950}',
                    hoverColor: '{primary.100}',
                    activeColor: '{primary.200}'
                },
                highlight: {
                    background: '{primary.50}',
                    focusBackground: '{primary.300}',
                    color: '{primary.950}',
                    focusColor: '{primary.950}'
                }
            }
        }
    },
    components: {
        button: {
            // paddingX: "{my.button.padding.x}",
            // paddingY: "{my.button.padding.y}"
        }
    }
});

export default Noir;