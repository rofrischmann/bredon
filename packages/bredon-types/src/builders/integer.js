/* @flow */
import type { SimpleNode } from '../../../../flowtypes/AST'

export default function integer(
  value: number,
  isNegative?: boolean = false
): SimpleNode {
  return {
    type: 'Integer',
    value,
    negative: isNegative
  }
}
