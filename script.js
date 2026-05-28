.topbar {
    position: sticky;
    top: 0;
    z-index: 20;
    background: rgba(251, 250, 247, 0.86);
    border-bottom: 1px solid rgba(233, 229, 223, 0.78);
    backdrop-filter: blur(18px);
}

.nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 82px;
    gap: 28px;
}

.brand {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-weight: 900;
    letter-spacing: 0;
}

.brand-mark {
    display: grid;
    place-items: center;
    width: 46px;
    height: 46px;
    color: var(--white);
    background: var(--ink);
    border-radius: 50%;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 15px;
    box-shadow: inset 0 -7px 0 rgba(217, 75, 75, 0.9);
}

.brand span:last-child {
    font-size: 22px;
}

.brand em {
    color: var(--red);
    font-style: normal;
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 30px;
    color: #333333;
    font-size: 15px;
    font-weight: 650;
}

.nav-links a {
    position: relative;
    padding: 8px 0;
}

.nav-links a::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 2px;
    content: "";
    background: var(--red);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.2s ease;
}

.nav-links a:hover::after {
    transform: scaleX(1);
}

.nav-actions {
    display: flex;
    align-items: center;
    gap: 10px;
}

.icon-button {
    position: relative;
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    color: var(--ink);
    background: transparent;
    border: 1px solid transparent;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.icon-button:hover {
    background: var(--white);
    border-color: var(--line);
    transform: translateY(-1px);
}

.icon-button svg {
    width: 20px;
    height: 20px;
    stroke: currentColor;
    stroke-width: 2;
    fill: none;
}

.cart-count {
    position: absolute;
    top: 2px;
    right: 0;
    display: grid;
    place-items: center;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    color: var(--white);
    background: var(--red);
    border-radius: 999px;
    font-size: 11px;
    font-weight: 800;
}

.menu-toggle {
    display: none;
}

@media (max-width: 960px) {
    .nav {
        min-height: 72px;
    }

    .menu-toggle {
        display: grid;
    }

    .nav-links {
        position: absolute;
        top: 72px;
        right: 20px;
        left: 20px;
        display: none;
        flex-direction: column;
        align-items: stretch;
        gap: 0;
        padding: 12px;
        background: var(--white);
        border: 1px solid var(--line);
        border-radius: var(--radius);
        box-shadow: var(--shadow);
    }

    .nav-links.open {
        display: flex;
    }

    .nav-links a {
        padding: 14px;
    }
}

@media (max-width: 640px) {
    .brand span:last-child {
        font-size: 19px;
    }

    .nav-actions .icon-button:first-child {
        display: none;
    }
}
