import { Toaster } from 'react-hot-toast';

function ToastMessage() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2500,
        style: {
          borderRadius: '16px',
          background: '#0f172a',
          color: '#fff',
        },
      }}
    />
  );
}

export default ToastMessage;
