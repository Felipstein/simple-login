import './Overlay.css';

interface OverlayProps {
  isVisible?: boolean;
  children: React.ReactNode;
}

export function Overlay({ isVisible = false, children }: OverlayProps) {
  if(!isVisible) {
    return null;
  }

  return (
    <div className="overlay">
      {children}
    </div>
  );
}
