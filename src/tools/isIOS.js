function iOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod',
    'MacIntel'
  ].includes(navigator?.userAgentData?.platform || navigator?.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
}

export default iOS;