import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Easing,
    Modal
} from 'react-native';

const CustomLoader = ({ visible }) => {
    const spinAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const dot1 = useRef(new Animated.Value(0.3)).current;
    const dot2 = useRef(new Animated.Value(0.3)).current;
    const dot3 = useRef(new Animated.Value(0.3)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            // Fade in
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }).start();

            // Spin animation
            Animated.loop(
                Animated.timing(spinAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            ).start();

            // Pulse animation for inner circle
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.15,
                        duration: 600,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 600,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ])
            ).start();

            // Dot bounce animations
            const animateDot = (val, delay) => {
                Animated.loop(
                    Animated.sequence([
                        Animated.delay(delay),
                        Animated.timing(val, {
                            toValue: 1,
                            duration: 350,
                            useNativeDriver: true,
                        }),
                        Animated.timing(val, {
                            toValue: 0.3,
                            duration: 350,
                            useNativeDriver: true,
                        }),
                    ])
                ).start();
            };
            animateDot(dot1, 0);
            animateDot(dot2, 180);
            animateDot(dot3, 360);
        } else {
            fadeAnim.setValue(0);
            spinAnim.setValue(0);
            pulseAnim.setValue(1);
            dot1.setValue(0.3);
            dot2.setValue(0.3);
            dot3.setValue(0.3);
        }
    }, [visible]);

    if (!visible) return null;

    const spin = spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Modal transparent visible={visible} animationType="none" statusBarTranslucent>
            <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
                <View style={styles.card}>
                    {/* Outer spinning ring */}
                    <View style={styles.ringWrapper}>
                        <Animated.View style={[styles.spinRing, { transform: [{ rotate: spin }] }]} />

                        {/* Inner pulsing circle */}
                        <Animated.View style={[styles.innerCircle, { transform: [{ scale: pulseAnim }] }]}>
                            <Text style={styles.tigerEmoji}>🐯</Text>
                        </Animated.View>
                    </View>

                    {/* Brand text */}
                    <Text style={styles.brandText}>TIGER 999</Text>
                    <Text style={styles.loadingLabel}>Loading...</Text>

                    {/* Dot row */}
                    <View style={styles.dotRow}>
                        <Animated.View style={[styles.dot, { opacity: dot1, transform: [{ scale: dot1 }] }]} />
                        <Animated.View style={[styles.dot, { opacity: dot2, transform: [{ scale: dot2 }] }]} />
                        <Animated.View style={[styles.dot, { opacity: dot3, transform: [{ scale: dot3 }] }]} />
                    </View>
                </View>
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: 180,
        backgroundColor: '#1A1A1A',
        borderRadius: 24,
        paddingVertical: 28,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#C36578',
        shadowColor: '#C36578',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 20,
    },
    ringWrapper: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    spinRing: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3.5,
        borderColor: 'transparent',
        borderTopColor: '#C36578',
        borderRightColor: '#FFD700',
    },
    innerCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#2A2A2A',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333',
    },
    tigerEmoji: {
        fontSize: 26,
    },
    brandText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFD700',
        letterSpacing: 2,
        fontFamily: 'Poppins_600SemiBold',
        marginBottom: 4,
    },
    loadingLabel: {
        fontSize: 12,
        color: '#aaa',
        fontFamily: 'Poppins_600SemiBold',
        marginBottom: 14,
    },
    dotRow: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#C36578',
    },
});

export default CustomLoader;
