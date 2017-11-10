import {
  isInteger,
  isStringLiteral,
  isURL,
  isIdentifier,
  isFloat,
  isDimension,
  isFunctionExpression,
} from 'bredon-types'

import {
  isAngle,
  isColor,
  isCubicBezier,
  isFrames,
  isGlobal,
  isImage,
  isLength,
  isLengthPercentage,
  isNumber,
  isOpacity,
  isPercentage,
  isPosition,
  isRepeat,
  isSize,
  isSteps,
  isSvgLength,
  isTime,
} from './types'

import matchesKeyword from './utils/matchesKeyword'
import matchesIdentifier from './utils/matchesIdentifier'
import validateNodeList from './utils/validateNodeList'
import validateUnorderedNodeList from './utils/validateUnorderedNodeList'
import normalizeNodeList from './utils/normalizeNodeList'
import arrayReduce from './utils/arrayReduce'

const validators = {
  MozBinding: isURL,
  MozBorderBottomColors: (node, isMultiValue) =>
    validateNodeList(isColor)(normalizeNodeList(node, isMultiValue)),
  MozBorderLeftColors: (node, isMultiValue) =>
    validateNodeList(isColor)(normalizeNodeList(node, isMultiValue)),
  MozBorderRadiusBottomleft: (node, isMultiValue) =>
    validateNodeList(isLengthPercentage, 2)(
      normalizeNodeList(node, isMultiValue)
    ),
  MozBorderRadiusBottomright: (node, isMultiValue) =>
    validateNodeList(isLengthPercentage, 2)(
      normalizeNodeList(node, isMultiValue)
    ),
  MozBorderRadiusTopleft: (node, isMultiValue) =>
    validateNodeList(isLengthPercentage, 2)(
      normalizeNodeList(node, isMultiValue)
    ),
  MozBorderRadiusTopright: (node, isMultiValue) =>
    validateNodeList(isLengthPercentage, 2)(
      normalizeNodeList(node, isMultiValue)
    ),
  MozBorderRightColors: (node, isMultiValue) =>
    validateNodeList(isColor)(normalizeNodeList(node, isMultiValue)),
  MozBorderTopColors: (node, isMultiValue) =>
    validateNodeList(isColor)(normalizeNodeList(node, isMultiValue)),
  MozForceBrokenImageIcon: isInteger,
  MozOutlineRadiusBottomleft: (node, isMultiValue) =>
    validateNodeList(isLengthPercentage, 2)(
      normalizeNodeList(node, isMultiValue)
    ),
  MozOutlineRadiusBottomright: (node, isMultiValue) =>
    validateNodeList(isLengthPercentage, 2)(
      normalizeNodeList(node, isMultiValue)
    ),
  MozOutlineRadiusTopleft: (node, isMultiValue) =>
    validateNodeList(isLengthPercentage, 2)(
      normalizeNodeList(node, isMultiValue)
    ),
  MozOutlineRadiusTopright: (node, isMultiValue) =>
    validateNodeList(isLengthPercentage, 2)(
      normalizeNodeList(node, isMultiValue)
    ),
  WebkitBorderBeforeColor: isColor,
  WebkitBorderBeforeStyle: (node, isMultiValue) =>
    isMultiValue &&
    node.length <= 4 &&
    validateNodeList(matchesKeyword('WebkitBorderBeforeStyle')),
  WebkitBorderBeforeWidth: (node, isMultiValue) => {
    if (isMultiValue) {
      return (
        node.length <= 4 &&
        validateNodeList(
          node =>
            isLength(node) || matchesKeyword('WebkitBorderBeforeWidth')(node)
        )
      )
    }

    return isLength(node)
  },
  WebkitLineCamp: node => isInteger(node) && !node.negative,
  WebkitMaskPositionX: isLengthPercentage,
  WebkitMaskPositionY: isLengthPercentage,
  WebkitTapHighlightColor: isColor,
  WebkitTextFillColor: isColor,
  WebkitTextStrokeColor: isColor,
  WebkitTextStrokeWidth: isLength,
  animationDelay: isDimension,
  animationDuration: isDimension,
  animationIterationCount: isInteger,
  animationName: isIdentifier,
  animationTimingFunction: isFunctionExpression,
  backgroundColor: isColor,
  backgroundPosition: isPosition,
  backgroundPositionX: (node, isMultiValue) => {
    if (isMultiValue) {
      return (
        node.length === 2 &&
        matchesIdentifier(['left', 'right', 'x-start', 'x-end'])(node[0]) &&
        isLengthPercentage(node[1])
      )
    }

    return (
      matchesIdentifier(['center', 'left', 'right', 'x-start', 'x-end'])(
        node
      ) || isLengthPercentage(node)
    )
  },
  backgroundPositionY: (node, isMultiValue) => {
    if (isMultiValue) {
      return (
        node.length === 2 &&
        matchesIdentifier(['top', 'bottom', 'y-start', 'y-end'])(node[0]) &&
        isLengthPercentage(node[1])
      )
    }

    return (
      matchesIdentifier(['center', 'top', 'bottom', 'y-start', 'y-end'])(
        node
      ) || isLengthPercentage(node)
    )
  },
  baselineShift: node => isNumber(node) || isLength(node),
  behavior: isURL,
  blockSize: isSize,
  border: (node, isMultiValue) =>
    validateUnorderedNodeList([
      validators.borderWidth,
      validators.borderStyle,
      validators.borderColor,
    ])(normalizeNodeList(node, isMultiValue)),
  borderBlockEnd: (node, isMultiValue) =>
    validateUnorderedNodeList([
      validators.borderBlockEndWidth,
      validators.borderBlockEndColor,
      validators.borderBlockEndStyle,
    ])(normalizeNodeList(node, isMultiValue)),
  borderBlockEndColor: isColor,
  borderBlockEndStyle: (node, isMultiValue) =>
    isMultiValue &&
    node.length <= 4 &&
    validateNodeList(matchesKeyword('borderBlockEndStyle')),
  borderBlockEndWidth: (node, isMultiValue) => {
    if (isMultiValue && node.length <= 4) {
      return validateNodeList(
        node => isLength(node) || matchesKeyword('borderBlockEndWidth')(node)
      )
    }

    return isLength(node)
  },
  borderBlockStart: (node, isMultiValue) =>
    validateUnorderedNodeList([
      validators.borderBlockStartWidth,
      validators.borderBlockStartColor,
      validators.borderBlockStartStyle,
    ])(normalizeNodeList(node, isMultiValue)),
  borderBlockStartColor: isColor,
  borderBlockStartStyle: (node, isMultiValue) =>
    isMultiValue &&
    node.length <= 4 &&
    validateNodeList(matchesKeyword('borderBlockStartStyle')),
  borderBlockStartWidth: (node, isMultiValue) => {
    if (isMultiValue && node.length <= 4) {
      return validateNodeList(
        node => isLength(node) || matchesKeyword('borderBlockStartWidth')(node)
      )
    }

    return isLength(node)
  },
  borderBottom: (node, isMultiValue) =>
    validateUnorderedNodeList([
      validators.borderBottomWidth,
      validators.borderBottomColor,
      matchesKeyword('borderBottomStyle'),
    ])(normalizeNodeList(node, isMultiValue)),
  borderBottomColor: isColor,
  borderBottomLeftRadius: (node, isMultiValue) =>
    validateNodeList(isLengthPercentage, 2)(
      normalizeNodeList(node, isMultiValue)
    ),
  borderBottomRightRadius: (node, isMultiValue) =>
    validateNodeList(isLengthPercentage, 2)(
      normalizeNodeList(node, isMultiValue)
    ),
  borderBottomWidth: isLength,
  borderColor: (node, isMultiValue) =>
    validateUnorderedNodeList([
      validators.borderTopColor,
      validators.borderLeftColor,
      validators.borderBottomColor,
      validators.borderRightColor,
    ])(normalizeNodeList(node, isMultiValue)),
  borderImageOutset: (node, isMultiValue) =>
    validateNodeList(node => isNumber(node) || isLength(number), 4)(
      normalizeNodeList(node, isMultiValue)
    ),
  borderImageRepeat: (node, isMultiValue) =>
    isMultiValue &&
    node.length === 2 &&
    validateNodeList(matchesKeyword('borderImageRepeat')),
  borderImageWidth: (node, isMultiValue) => {
    if (isMultiValue && node.length <= 4) {
      return validateNodeList(
        node =>
          isLength(node) ||
          isPercentage(node) ||
          isNumber(node) ||
          matchesKeyword('borderImageWidth')(node)
      )
    }

    return isLength(node) || isPercentage(node) || isNumber(node)
  },
  borderInlineEnd: (node, isMultiValue) =>
    validateUnorderedNodeList([
      validators.borderInlineEndWidth,
      validators.borderInlineEndColor,
      validators.borderInlineEndStyle,
    ])(normalizeNodeList(node, isMultiValue)),
  borderInlineEndColor: isColor,
  borderInlineEndStyle: (node, isMultiValue) =>
    isMultiValue &&
    node.length <= 4 &&
    validateNodeList(matchesKeyword('borderInlineEndStyle')),
  borderInlineEndWidth: (node, isMultiValue) => {
    if (isMultiValue && node.length <= 4) {
      return validateNodeList(
        node => isLength(node) || matchesKeyword('borderInlineEndWidth')(node)
      )
    }

    return isLength(node)
  },
  borderInlineStart: (node, isMultiValue) =>
    validateUnorderedNodeList([
      validators.borderInlineStartWidth,
      validators.borderInlineStartColor,
      validators.borderInlineStartStyle,
    ])(normalizeNodeList(node, isMultiValue)),
  borderInlineStartColor: isColor,
  borderInlineStartStyle: (node, isMultiValue) =>
    isMultiValue &&
    node.length <= 4 &&
    validateNodeList(matchesKeyword('borderInlineStartStyle')),
  borderInlineStartWidth: (node, isMultiValue) => {
    if (isMultiValue && node.length <= 4) {
      return validateNodeList(
        node => isLength(node) || matchesKeyword('borderInlineStartWidth')(node)
      )
    }

    return isLength(node)
  },
  borderLeft: (node, isMultiValue) =>
    validateUnorderedNodeList([
      validators.borderLeftWidth,
      validators.borderLeftColor,
      matchesKeyword('borderLeftStyle'),
    ])(normalizeNodeList(node, isMultiValue)),
  borderLeftColor: isColor,
  borderLeftWidth: isLength,
  // TODO: / value syntax
  borderRadius: (node, isMultiValue) =>
    validateNodeList(isLengthPercentage, 2)(
      normalizeNodeList(node, isMultiValue)
    ),
  borderRight: (node, isMultiValue) =>
    validateUnorderedNodeList([
      validators.borderRightWidth,
      validators.borderRightColor,
      matchesKeyword('borderRightStyle'),
    ])(normalizeNodeList(node, isMultiValue)),
  borderRightColor: isColor,
  borderRightWidth: isLength,
  borderSpacing: (node, isMultiValue) =>
    validateNodeList(isLength, 2)(normalizeNodeList(node, isMultiValue)),
  borderStyle: (node, isMultiValue) =>
    validateUnorderedNodeList([
      matchesKeyword('borderLeftStyle'),
      matchesKeyword('borderTopStyle'),
      matchesKeyword('borderBottomStyle'),
      matchesKeyword('borderRightStyle'),
    ])(normalizeNodeList(node, isMultiValue)),
  borderTop: (node, isMultiValue) =>
    validateUnorderedNodeList([
      validators.borderTopWidth,
      validators.borderTopColor,
      matchesKeyword('borderTopStyle'),
    ])(normalizeNodeList(node, isMultiValue)),
  borderTopColor: isColor,
  borderTopWidth: isLength,
  borderTopLeftRadius: (node, isMultiValue) =>
    validateNodeList(isLengthPercentage, 2)(
      normalizeNodeList(node, isMultiValue)
    ),
  borderTopRightRadius: (node, isMultiValue) =>
    validateNodeList(isLengthPercentage, 2)(
      normalizeNodeList(node, isMultiValue)
    ),
  borderWidth: (node, isMultiValue) =>
    validateUnorderedNodeList([
      validators.borderTopWidth,
      validators.borderLeftWidth,
      validators.borderBottomWidth,
      validators.borderRightWidth,
    ])(normalizeNodeList(node, isMultiValue)),
  bottom: isLengthPercentage,
  boxFlex: isNumber,
  boxFlexGroup: isInteger,
  boxOrdinalGroup: isInteger,
  caretColor: isColor,
  // TODO: is valid rect
  clip: node => isFunctionExpression(node) && node.callee.name === 'rect',
  color: isColor,
  columnCount: isInteger,
  columnGap: isLength,
  columnRuleColor: isColor,
  columnRuleWidth: isLength,
  columnWidth: isLength,
  fillOpacity: isOpacity,
  flex: (node, isMultiValue) => {
    if (isMultiValue) {
      return (
        (node.length === 2 &&
          validateUnorderedNodeList([
            validators.flexGrow,
            validators.flexBasis,
          ])(node)) ||
        (node.length === 3 &&
          ((validators.flexGrow(node[0]) &&
            validators.flexShrink(node[1]) &&
            validators.flexBasis(node[2])) ||
            (validators.flexBasis(node[0]) &&
              validators.flexGrow(node[1]) &&
              validators.flexShrink(node[2]))))
      )
    }

    return validators.flexBasis(node) || validators.flexGrow(node)
  },
  flexBasis: isSize,
  flexFlow: (value, isMultiValue) =>
    validateUnorderedNodeList([
      matchesKeyword('flexDirection'),
      matchesKeyword('flexWrap'),
    ])(normalizeNodeList(node, isMultiValue)),
  flexGrow: isNumber,
  flexShrink: isNumber,
  fontFamily: node => isStringLiteral(node) || isIdentifier(node),
  fontLanguageOverwrite: isStringLiteral,
  fontSize: isLengthPercentage,
  fontSizeAdjust: isFloat,
  fontWeight: node =>
    isInteger(node) &&
    [100, 200, 300, 400, 500, 600, 700, 800, 900].indexOf(node.value) !== -1,
  glyphOrientationHorizontal: isAngle,
  glyphOrientationVertical: isAngle,
  height: isSize,
  inlineSize: isSize,
  kerning: isSvgLength,
  left: isLengthPercentage,
  letterSpacing: isLengthPercentage,
  lineHeight: node => isLength(node) || isNumber(node),
  listStyleImage: isURL,
  margin: (node, isMultiValue) =>
    validateNodeList(
      // margin-left is equivalent to -top, -bottom, -right
      node => validators.marginLeft(node) || matchesKeyword('marginLeft')(node),
      4
    )(normalizeNodeList(node, isMultiValue)),
  marginBlockEnd: isLengthPercentage,
  marginBlockStart: isLengthPercentage,
  marginBottom: isLengthPercentage,
  marginInlineEnd: isLengthPercentage,
  marginInlineStart: isLengthPercentage,
  marginLeft: isLengthPercentage,
  marginRight: isLengthPercentage,
  marginTop: isLengthPercentage,
  marker: isURL,
  markerEnd: isURL,
  markerMid: isURL,
  markerOffset: isLength,
  markerStart: isURL,
  maskBorderOutset: (node, isMultiValue) =>
    validateNodeList(node => isLength(node) || isNumber(node), 4)(
      normalizeNodeList(node, isMultiValue)
    ),
  maskBorderOutset: (node, isMultiValue) =>
    isMultiValue &&
    node.length === 2 &&
    validateNodeList(matchesKeyword('maskBorderOutset'))(node),
  maskBorderSource: isImage,
  maskBorderWidth: (node, isMultiValue) =>
    validateNodeList(
      node =>
        isLengthPercentage(node) ||
        isNumber(node) ||
        matchesKeyword('maskBorderWidth')(node),
      4
    )(normalizeNodeList(node, isMultiValue)),
  maskPosition: isPosition,
  maxBlockSize: isLength,
  maxHeight: isLength,
  maxInlineSize: isLength,
  maxWidth: isLength,
  minBlockSize: isLength,
  minHeight: isLength,
  minInlineSize: isLength,
  minWidth: isLength,
  msFilter: isStringLiteral,
  msFlexNegative: isNumber,
  msFlexOrder: isInteger,
  msFlexPositive: isNumber,
  objectPosition: isPosition,
  offsetBlockEnd: isLength,
  offsetBlockStart: isLength,
  offsetDistance: isLengthPercentage,
  offsetInlineEnd: isLength,
  offsetInlineStart: isLength,
  offsetAnchor: isPosition,
  offsetPosition: isPosition,
  opacity: isOpacity,
  order: isInteger,
  orphans: isInteger,
  outlineColor: isColor,
  outlineOffset: isLength,
  outlineWidth: isLength,
  padding: (node, isMultiValue) =>
    validateNodeList(
      // padding-left is equivalent to -top, -bottom, -right
      node =>
        validators.paddingLeft(node) || matchesKeyword('paddingLeft')(node),
      4
    )(normalizeNodeList(node, isMultiValue)),
  paddingBlockEnd: isLengthPercentage,
  paddingBlockStart: isLengthPercentage,
  paddingBottom: isLengthPercentage,
  paddingInlineEnd: isLengthPercentage,
  paddingInlineStart: isLengthPercentage,
  paddingLeft: isLengthPercentage,
  paddingRight: isLengthPercentage,
  paddingTop: isLengthPercentage,
  pauseAfter: isTime,
  pauseBefore: isTime,
  perspective: isLength,
  perspectiveOrigin: isPosition,
  quotes: (node, isMultiValue) =>
    isMultiValue &&
    node.length % 2 === 0 &&
    validateNodeList(isStringLiteral)(node),
  rest: (node, isMultiValue) =>
    validateUnorderedNodeList([validators.restAfter, validators.restBefore])(
      normalizeNodeList(node, isMultiValue)
    ),
  restAfter: isTime,
  restBefore: isTime,
  right: isLengthPercentage,
  shapeImageThreshold: isNumber,
  scrollSnapCoordinate: (node, isMultiValue, isValueList) =>
    (!isValueList && matchesIdentifier(['none'])(node)) || isPosition(node),
  scrollSnapDestination: isPosition,
  scrollSnapPointsX: isRepeat,
  scrollSnapPointsY: isRepeat,
  shapeMargin: isLengthPercentage,
  strokeDasharray: (node, isMultiValue) =>
    validateNodeList(isSvgLength)(normalizeNodeList(node, isMultiValue)),
  strokeDashoffset: isSvgLength,
  strokeMiterlimit: node =>
    (isInteger(node) && node.value >= 1) ||
    (isFloat(node) && node.integer >= 1),
  strokeOpacity: isOpacity,
  strokeWidth: isSvgLength,
  tabSize: isInteger,
  textDecoration: (node, isMultiValue) =>
    validateUnorderedNodeList([
      matchesKeyword('textDecorationStyle'),
      validators.textDecorationColor,
      node =>
        validators.textDecorationLine(node) ||
        matchesKeyword('textDecorationLine')(node),
    ])(normalizeNodeList(node, isMultiValue)),
  textDecorationColor: isColor,
  textDecorationLine: (node, isMultiValue) =>
    validateUnorderedNodeList([
      matchesIdentifier(['underline']),
      matchesIdentifier(['overline']),
      matchesIdentifier(['line-through']),
      matchesIdentifier(['blink']),
    ])(normalizeNodeList(node, isMultiValue)),
  textDecorationSkip: (node, isMultiValue) =>
    validateUnorderedNodeList([
      matchesIdentifier(['objects']),
      matchesIdentifier(['spaces']),
      matchesIdentifier(['ink']),
      matchesIdentifier(['edges']),
      matchesIdentifier(['box-decoration']),
    ])(normalizeNodeList(node, isMultiValue)),
  textEmphasis: (node, isMultiValue) =>
    validateUnorderedNodeList([
      validators.textEmphasisColor,
      validators.textEmphasisStyle,
    ])(normalizeNodeList(node, isMultiValue)),
  textEmphasisColor: isColor,
  textEmphasisPosition: (node, isMultiValue) =>
    isMultiValue &&
    node.length === 2 &&
    matchesIdentifier(['over', 'under'])(node[0]) &&
    matchesIdentifier(['left', 'right'])(node[1]),
  textEmphasisStyle: (node, isMultiValue) => {
    if (isMultiValue) {
      return validateUnorderedNodeList([
        matchesIdentifier(['filled', 'open']),
        matchesIdentifier([
          'dot',
          'circle',
          'double-circle',
          'triangle',
          'sesame',
        ]),
      ])(node)
    }

    return isStringLiteral(node)
  },
  textIndent: (node, isMultiValue) => {
    if (isMultiValue) {
      return validateUnorderedNodeList([
        isLengthPercentage,
        matchesIdentifier(['hanging']),
        matchesIdentifier(['each-line']),
      ])(node)
    }

    return isLengthPercentage(node)
  },
  textOverflow: (node, isMultiValue) => {
    if (isMultiValue && node.length === 2) {
      return validateNodeList(
        node => isStringLiteral(node) || matchesKeyword('textOverflow')(node)
      )
    }

    return isStringLiteral(node)
  },
  textShadow: (node, isMultiValue) => {
    if (isMultiValue) {
      if (node.length === 2) {
        return validateNodeList(isLength)(node)
      }

      if (node.length === 3) {
        return (
          validateNodeList(isLength)(node) ||
          (isLength(node[0]) && isLength(node[1]) && isColor(node[2]))
        )
      }

      if (node.length === 4) {
        return (
          isLength(node[0]) &&
          isLength(node[1]) &&
          isLength(node[2]) &&
          isColor(node[3])
        )
      }
    }
  },
  textSizeAdjust: isPercentage,
  textUnderlinePosition: (node, isMultiValue) =>
    isMultiValue &&
    validateUnorderedNodeList([
      matchesIdentifier(['under']),
      matchesIdentifier(['left', 'right']),
    ])(node),
  top: isLength,
  touchAction: (node, isMultiValue) => {
    if (isMultiValue) {
      return validateUnorderedNodeList([
        matchesIdentifier(['pan-x', 'pan-left', 'pan-right']),
        matchesIdentifier(['pan-y', 'pan-up', 'pan-down']),
        matchesIdentifier(['pinch-zoom']),
      ])(node)
    }

    return matchesIdentifier([
      'pan-x',
      'pan-left',
      'pan-right',
      'pan-y',
      'pan-up',
      'pan-down',
      'pinch-zoom',
    ])(node)
  },
  transformOrigin: (node, isMultiValue) => {
    if (isMultiValue) {
      return (
        (node.length === 2 &&
          validateUnorderedNodeList([
            node =>
              isLengthPercentage(node) ||
              matchesIdentifier(['left', 'center', 'right'])(node),
            node =>
              isLengthPercentage(node) ||
              matchesIdentifier(['top', 'center', 'bottom'])(node),
          ])(node)) ||
        (node.length === 3 &&
          validateUnorderedNodeList([
            node =>
              isLengthPercentage(node) ||
              matchesIdentifier(['left', 'center', 'right'])(node),
            node =>
              isLengthPercentage(node) ||
              matchesIdentifier(['top', 'center', 'bottom'])(node),
          ])([node[0], node[1]]) &&
          isLengthPercentage(node[2]))
      )
    }

    return isLengthPercentage(node)
  },
  transition: (node, isMultiValue) => {
    validateUnorderedNodeList([
      validators.transitionDelay,
      validators.transitionDuration,
      validators.transitionProperty,
      validators.transitionTimingFunction,
    ])(normalizeNodeList(node, isMultiValue))
  },
  transitionDelay: isTime,
  transitionDuration: isTime,
  transitionProperty: isIdentifier,
  transitionTimingFunction: node =>
    isCubicBezier(node) || isFrames(node) || isSteps(node),
  verticalAlign: isLengthPercentage,
  voiceBalance: isNumber,
  voiceDuration: isTime,
  widows: isInteger,
  width: isSize,
  willChange: (node, isMultiValue, isValueList) =>
    isValueList
      ? isIdentifier(node) && node.value !== 'auto'
      : matchesIdentifier(['auto'])(node),
  wordSpacing: isLengthPercentage,
  zIndex: isInteger,
  zoom: node => isNumber(node) || isPercentage(node),
}

export default validators