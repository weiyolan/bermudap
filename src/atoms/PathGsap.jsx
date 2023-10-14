import { useCallback, useEffect, useRef, useState } from "react"


export default function PathGSAPStandalone(props) {

  let pathRef = useRef(null)
  let [pathLength, setPathLength] = useState(0)
  let [mySpeed, setMySpeed] = useState(1)
  let [dashArray, setDashArray] = useState('')
  let [dashLineLength, setDashLineLength] = useState(0)
  let [style, setStyle] = useState({ transition: 'none' })
  let [animationEnd, setAnimationEnd] = useState(false)

  let fakeScrolled = 0;
  const getPathProps = useCallback((props) => {
    let pathProps = { ...props }
    // GSAP
    delete pathProps.timeline1
    delete pathProps.tweens
    //OLD
    delete pathProps.handleLength
    delete pathProps.print
    delete pathProps.inverse
    delete pathProps.initialDash
    delete pathProps.transitStrokeAnimation
    delete pathProps.transitPortion
    delete pathProps.animateFill
    delete pathProps.animateStroke
    delete pathProps.fillColor
    delete pathProps.strokeColor
    delete pathProps.ignoreVisibility //to disable a transparent stroke when not visible
    delete pathProps.scrolled
    delete pathProps.useId
    delete pathProps.lengthFactor
    delete pathProps.fastErase
    delete pathProps.myGradient
    delete pathProps.shadowSmall
    delete pathProps['stroke-width']
    delete pathProps.initialDash
    pathProps.strokeWidth = props?.strokeWidth || '4'
    pathProps.strokeLinejoin = "round"
    delete pathProps['stroke-linejoin']
    pathProps.strokeLinecap = "round"
    delete pathProps['stroke-linecap']
    pathProps.fillRule = pathProps['fill-rule']
    delete pathProps['fill-rule']
    pathProps.clipRule = pathProps['clip-rule']
    delete pathProps['clip-rule']
    pathProps.strokeDasharray = dashArray.length > 0 ? dashArray : (pathLength) + ' ' + (pathLength);

    if (props?.ignoreVisibility) {
      let myStroke = props.myGradient ? props.myGradient : props?.strokeColor || '#FFF5EA'
      pathProps.stroke = props.animateStroke ? animationEnd ? 'transparent' : myStroke : myStroke
      pathProps.fill = props.animateFill ? animationEnd ? props?.fillColor || '#FFF5EA' : 'transparent' : 'transparent';
    } else {
      pathProps.stroke = 'transparent'
      pathProps.fill = 'transparent'
    }
    return pathProps
  }, [animationEnd, dashArray, pathLength])

  let childProps = getPathProps(props);

  let newOffset = (Math.min(Math.max(fakeScrolled * mySpeed, 0), 1) * (props.inverse ? 1 : -1) || 0)

  childProps.strokeDashoffset = (pathLength + (dashLineLength > 0 ? 0 : 0)) + (pathLength + (dashLineLength > 0 ? 0 : 0)) * newOffset * (props?.transitStrokeAnimation ? 2 : 1)
  // props.print && console.log(newOffset)
  // props.print && console.log(childProps.strokeDashoffset)

  // ================== CALCULATE PATHLENGTH ==================
  useEffect(() => {
    let usePath = pathRef.current;
    let originalPath = props.useId !== undefined ? document.querySelector(usePath.getAttribute('href')) : usePath
    let length = originalPath.getTotalLength()
    let scale = 1
    if (originalPath !== usePath) {
      const bbox = usePath.getBoundingClientRect();
      const scaleX = bbox.width / originalPath.getBBox().width;
      const scaleY = bbox.height / originalPath.getBBox().height;
      scale = Math.min(scaleX, scaleY);
    }
    if (props.print) {
      // console.log(realScrolled, fakeScrolled)
      // console.log('length is:' + length); console.log('double is: ' + props.double); console.log('so pathlength is : ' + length/props.double)
      // console.log(usePath)
      // console.log(originalPath)
      // console.log(usePath===originalPath)
      // console.log('My (' + props.print + ') path has length of: ' + scale * length / (props?.double||1))
      // console.log(scale * length / (props?.double||1))
    }
    setPathLength(scale * length / (props?.double || 1));
    props.print && console.log(props.print + ' pathlength setted')

  }, [props.double, props.print, props.useId])


  //!!!!!!!!!! ====================GSAP====================!!!!!!!!!!
  useEffect(() => {
    if (props.tweens !== undefined && props.tweens[0].timeline !== undefined) {

      props.tweens.forEach((tween) => {
        let ratio = tween.ratio;
        let myNewOffset = (Math.min(Math.max(ratio * mySpeed, 0), 1) * (props.inverse ? 1 : -1) || 0);
        let myStroke = props.myGradient ? props.myGradient : props?.strokeColor || '#FFF5EA';
        if (tween.timeline.getById(tween.id) === undefined) {
          if (tween.ratio) {
            tween.timeline
              .set(`#${props.id}`, {
                stroke: myStroke
              }, tween.position)
              .to(`#${props.id}`, {
                id: tween.id,
                strokeDashoffset: (pathLength + (dashLineLength > 0 ? 0 : 0)) + (pathLength + (dashLineLength > 0 ? 0 : 0)) * myNewOffset * (props?.transitStrokeAnimation ? 2 : 1),
                ...tween.attr
              }, tween.position)
          } else {
            tween.timeline.to(`#${props.id}`,
              {
                id: tween.id,
                ...tween.attr
              }, tween.position)
          }
        }
      })
    }
  }, [props.tweens, pathLength])

  useEffect(() => {
    if (props.initialDash) {
      let stringDash = props.initialDash.split(' ');
      let lineString = stringDash[0];
      // let gapString = stringDash[1];
      let numDash = stringDash.map(i => +i);
      let dashLength = numDash.reduce((acc, x) => acc + x, 0);

      let repeat = Math.floor(pathLength / dashLength);
      // console.log(repeat)
      let newStringDash = Array(repeat).fill(props.initialDash)
      newStringDash.push(lineString)
      newStringDash.push(`${pathLength}`)
      newStringDash = newStringDash.join(' ')
      // console.log(newStringDash)
      setDashArray(newStringDash)
      setDashLineLength(+lineString)
      props.print && console.log('dashlength setted')
    }
  }, [props.initialDash, pathLength])

  useEffect(() => {
    if (props.transitStrokeAnimation) {
      let newStringDash = []
      newStringDash.push(`${pathLength * (props?.transitPortion ? (props.transitPortion) : 0.95)}`)
      newStringDash.push(`${pathLength * (props?.transitPortion ? (2 - props.transitPortion) : 1.05)}`)
      newStringDash = newStringDash.join(' ')
      setDashArray(newStringDash)
      setDashLineLength(+pathLength)
      props.print && console.log('special dashlength setted')
      props.print && console.log(newStringDash)
    }
  }, [props.transitStrokeAnimation, pathLength])

  useEffect(() => {
    childProps = getPathProps(props);
  }, [pathLength, dashArray, props.fastErase, pathRef, props.animateStroke, props.inverse, props.print, props.myGradient, props.strokeWidth, props.position, mySpeed, dashLineLength, props.strokeColor, props.animateFill, props.initialDash])

  switch (props.type) {
    case 'rect':
      return <rect ref={pathRef} className={`${props?.shadowSmall ? 'drop-shadow-[0_10px_8px_rgba(0,0,0,0.2)]' : props?.shadowBig ? 'drop-shadow-[0_10px_8px_rgba(0,0,0,1)]' : ''}`} style={style} {...childProps} />
    case 'circle':
      return <circle ref={pathRef} className={`${props?.shadowSmall ? 'drop-shadow-[0_10px_8px_rgba(0,0,0,0.2)]' : props?.shadowBig ? 'drop-shadow-[0_10px_8px_rgba(0,0,0,1)]' : ''}`} style={style} {...childProps} />
    case 'use':
      return <use href={props.useId} ref={pathRef} className={`${props?.shadowSmall ? 'drop-shadow-[0_10px_8px_rgba(0,0,0,0.2)]' : props?.shadowBig ? 'drop-shadow-[0_10px_8px_rgba(0,0,0,1)]' : ''}`} style={style} {...childProps} />
    default:
      return <path ref={pathRef} className={`${props?.shadowSmall ? 'drop-shadow-[0_10px_8px_rgba(0,0,0,0.2)]' : props?.shadowBig ? 'drop-shadow-[0_10px_8px_rgba(0,0,0,1)]' : ''}`} style={style} {...childProps} />
  }
}
