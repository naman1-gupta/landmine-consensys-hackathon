import { Keyframes, config } from 'react-spring';
import delay from 'delay';

const fast = { ...config.stiff, restSpeedThreshold: 1, restDisplacementThreshold: 0.01 };

export const LoginContainer = Keyframes.Spring({
  show: { to: { opacity: 1, y: 0, x: 0 } },
  showAndHide: [{ from: { opacity: 1, y: 0, x: 0 } }, { to: { opacity: 0, y: 100, x: -100 }, config: fast }],
  wiggle: async call => {
    await call({ to: { y: 0 }, config: config.wobbly });
    await delay(1000);
    await call({ to: { y: 100 }, config: config.gentle });
  }
});

export const Sidebar = Keyframes.Spring({
  open: async call => {
    await call({ to: { x: -100 }, config: config.gentle });
    await delay(120);
    await call({ to: { x: 0 }, config: config.default });
  },
  close: async call => {
    await delay(120);
    await call({ to: { x: -100 }, config: config.gentle });
  }
});

export const LoginGallery = Keyframes.Spring({
  open: async call => {
    await call({ to: { x: 100 }, config: config.gentle });
    await delay(120);
    await call({ to: { x: 0 }, config: config.default });
  },
  close: async call => {
    await delay(120);
    await call({ to: { x: 100 }, config: config.gentle });
  }
});

export const DashboardSidebar = Keyframes.Spring({
  open: [{ from: { x: -1000 } }, { to: { x: 0 }, config: config.default }],
  close: [{ from: { x: 0 } }, { to: { x: -1000 }, config: config.slow }]
});

export const DashboardHeader = Keyframes.Spring({
  // open: [{ from: { opacity: 0, y: -1000 } }, { to: { opacity: 1, y: 0 }, config: config.fast }],
  open: async call => {
    await call({ to: { opacity: 0, y: -100 }, config: config.gentle });
    await delay(120);
    await call({ to: { opacity: 1, y: 0 }, config: config.default });
  },
  close: async call => {
    await call({ from: { opacity: 1, y: 0 }, config: config.default });
    await delay(120);
    await call({ to: { opacity: 0, y: -100 }, config: config.default });
  }
});
