import { EditableText, Icon, Intent, Menu, MenuDivider, MenuItem, Tooltip } from '@blueprintjs/core'
import axios from 'axios'
import { Flow, Topic } from 'botpress/sdk'
import { confirmDialog, lang, TreeView } from 'botpress/shared'
import cx from 'classnames'
import { FlowView } from 'common/typings'
import _ from 'lodash'
import React, { FC, Fragment, useEffect, useState } from 'react'

import { buildFlowName } from '..//WorkflowEditor/utils'
import style from '../style.scss'

const lockedFlows = ['Built-In/welcome.flow.json', 'Built-In/error.flow.json', 'Built-In/feedback.flow.json']

export const TYPE_TOPIC = 'topic'
export const TYPES = {
  Topic: 'topic',
  Workflow: 'workflow',
  Folder: 'folder'
}

export interface CountByTopic {
  [topicName: string]: number
}

interface Props {
  filter: string
  readOnly: boolean
  currentFlow: Flow
  topics: Topic[]
  qnaCountByTopic: CountByTopic[]

  canDelete: boolean
  goToFlow: Function
  flows: IFlow[]

  duplicateFlow: Function
  deleteFlow: Function
  exportWorkflow: Function
  fetchTopics: () => void
  fetchFlows: () => void
  renameFlow: (flow: { targetFlow: string; name: string }) => void
  updateFlow: (flow: Partial<FlowView>) => void

  importWorkflow: (topicId: string) => void
  createWorkflow: (topicId: string) => void
  editQnA: (topicName: string) => void
  editWorkflow: (wfId: any, data: any) => void
  editTopic: (topicName: string | NodeData) => void
  exportTopic: (topicName: string | NodeData) => void
}

interface NodeData {
  name: string
  type?: NodeType
  label?: string
  id?: any
  icon?: string
  triggerCount?: number
  topic?: string
  /** List of workflows which have a reference to it */
  referencedIn?: string[]
  countByTopic?: CountByTopic
}

type NodeType = 'workflow' | 'folder' | 'topic' | 'qna' | 'addWorkflow'

interface IFlow {
  name: string
  label: string
}

const TopicList: FC<Props> = props => {
  const [flows, setFlows] = useState<NodeData[]>([])

  useEffect(() => {
    const qna = props.topics.map(topic => ({
      name: `${topic.name}/qna`,
      label: lang.tr('module.qna.fullName'),
      type: 'qna' as NodeType,
      icon: 'chat',
      countByTopic: props.qnaCountByTopic?.[topic.name] || 0
    }))

    setFlows([...qna, ...props.flows])
  }, [props.flows, props.topics, props.qnaCountByTopic])

  const deleteFlow = async (name: string) => {
    if (await confirmDialog(lang.tr('studio.flow.topicList.confirmDeleteFlow', { name }), {})) {
      props.deleteFlow(name)
    }
  }

  const deleteTopic = async (name: string) => {
    const matcher = new RegExp(`^${name}/`)
    const flowsToDelete = props.flows.filter(x => matcher.test(x.name))

    if (
      await confirmDialog(
        <span>
          {lang.tr('studio.flow.topicList.confirmDeleteTopic', { name })}
          <br />
          <br />
          {!!flowsToDelete.length && (
            <>
              {lang.tr('studio.flow.topicList.flowsAssociatedDelete', {
                warning: <strong>{lang.tr('studio.flow.topicList.bigWarning')}</strong>,
                count: flowsToDelete.length
              })}
            </>
          )}
        </span>,
        {}
      )
    ) {
      await axios.post(`${window.BOT_API_PATH}/deleteTopic/${name}`)
      flowsToDelete.forEach(flow => props.deleteFlow(flow.name))
      props.fetchTopics()
    }
  }

  const folderRenderer = (folder: string) => {
    const editTopic = async x => {
      await axios.post(`${window.BOT_API_PATH}/topic/${folder}`, { name: x, description: undefined })
    }
    return {
      label: (
        <div className={style.treeNode}>
          {folder !== 'Built-In' ? <EditableText onConfirm={editTopic} defaultValue={folder} /> : <span>{folder}</span>}
        </div>
      ),
      icon: 'none'
    }
  }

  const handleContextMenu = (element: NodeData | string, elementType) => {
    if (elementType === 'folder' && (element as NodeData).type !== 'addWorkflow') {
      const folder = element as string
      return (
        <Menu>
          <MenuItem
            id="btn-edit"
            icon="edit"
            text={lang.tr('studio.flow.topicList.editTopic')}
            onClick={() => props.editTopic(folder)}
          />
          <MenuItem
            id="btn-export"
            disabled={props.readOnly}
            icon="upload"
            text={lang.tr('studio.flow.topicList.exportTopic')}
            onClick={() => props.exportTopic(folder)}
          />
          <MenuItem
            id="btn-delete"
            icon="trash"
            text={lang.tr('studio.flow.topicList.deleteTopic')}
            intent={Intent.DANGER}
            onClick={() => deleteTopic(folder)}
          />
          <MenuDivider />
          <MenuItem
            id="btn-create"
            disabled={props.readOnly}
            icon="add"
            text={lang.tr('studio.flow.topicList.createNewWorkflow')}
            onClick={() => props.createWorkflow(name)}
          />
          <MenuItem
            id="btn-import"
            disabled={props.readOnly}
            icon="download"
            text={lang.tr('studio.flow.topicList.importExisting')}
            onClick={() => props.importWorkflow(name)}
          />
        </Menu>
      )
    } else if (_.isObject(element) && (element as NodeData).type === 'qna') {
      const { name } = element as NodeData

      return (
        <Menu>
          <MenuItem
            id="btn-edit"
            disabled={props.readOnly}
            icon="edit"
            text={lang.tr('edit')}
            onClick={() => props.editQnA(name.replace('/qna', ''))}
          />
        </Menu>
      )
    } else if (elementType === 'document') {
      const { name } = element as NodeData

      return (
        <Menu>
          <MenuItem
            id="btn-edit"
            disabled={props.readOnly}
            icon="edit"
            text={lang.tr('studio.flow.topicList.editWorkflow')}
            onClick={() => props.editWorkflow(name, element)}
          />
          <MenuItem
            id="btn-duplicate"
            disabled={props.readOnly}
            icon="duplicate"
            text={lang.tr('duplicate')}
            onClick={() => props.duplicateFlow(name)}
          />
          <MenuItem
            id="btn-export"
            disabled={props.readOnly}
            icon="export"
            text={lang.tr('export')}
            onClick={() => props.exportWorkflow(name)}
          />
          <MenuDivider />
          <MenuItem
            id="btn-delete"
            disabled={lockedFlows.includes(name) || !props.canDelete || props.readOnly}
            icon="delete"
            text={lang.tr('delete')}
            onClick={() => deleteFlow(name)}
          />
        </Menu>
      )
    }
  }

  const nodeRenderer = (el: NodeData) => {
    const { name, label, icon, type, triggerCount, referencedIn, countByTopic } = el
    const displayName = label || name.substr(name.lastIndexOf('/') + 1).replace(/\.flow\.json$/, '')

    const editWorkflow = x => {
      const fullName = buildFlowName({ topic: el.topic, workflow: x }, true)
      props.renameFlow({ targetFlow: name, name: fullName })
      props.updateFlow({ name: fullName })
    }

    const qnaTooltip = (
      <Tooltip content={lang.tr('studio.flow.topicList.nbQuestionsInTopic')} hoverOpenDelay={500}>
        <small>({countByTopic})</small>
      </Tooltip>
    )

    const tooltip = (
      <>
        <Tooltip content={lang.tr('studio.flow.topicList.nbTriggersInWorkflow')} hoverOpenDelay={500}>
          <small>({triggerCount})</small>
        </Tooltip>
        &nbsp;&nbsp;
        {!!referencedIn?.length && (
          <Tooltip
            content={
              <div>
                {lang.tr('studio.flow.topicList.workflowReceiving')}{' '}
                <ul>
                  {referencedIn.map(x => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            }
            hoverOpenDelay={500}
          >
            <small>
              <span className={style.referencedWorkflows}>({referencedIn?.length})</span>
            </small>
          </Tooltip>
        )}
      </>
    )

    return {
      label: (
        <div className={style.treeNode}>
          <span>
            {type !== 'qna' ? (
              <React.Fragment>
                <EditableText onConfirm={editWorkflow} defaultValue={displayName} /> {tooltip}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <span>{displayName}</span> {qnaTooltip}
              </React.Fragment>
            )}
          </span>
        </div>
      ),
      icon: 'none'
    }
  }

  const onClick = (el: NodeData | string, type) => {
    const nodeData = el as NodeData
    if (nodeData?.type === 'qna') {
      // Return true will mimic preventDefault for TreeView's onClick
      return true
    } else if (nodeData?.type === 'addWorkflow') {
      props.createWorkflow(nodeData.topic)
      return true
    }

    if (type === 'document') {
      props.goToFlow((el as NodeData).name)
    }
  }

  const onDoubleClick = (el: NodeData, type) => {
    if (el?.type === 'qna') {
      props.editQnA(el.name.replace('/qna', ''))
    } else if (el?.type !== 'addWorkflow' && type === 'document') {
      props.editWorkflow(el.name, el)
    }
  }

  const postProcessing = tree => {
    tree.forEach(parent => {
      parent.childNodes?.forEach(node => {
        node.nodeData.topic = parent.id
        if (node.id === `${parent.id}/qna`) {
          const wfCount = parent.childNodes?.filter(parentNode => node.id !== parentNode.id).length
          parent.label = (
            <div className={style.topicName}>
              {parent.label}{' '}
              <span className={style.tag}>
                {node.nodeData?.countByTopic} Q&A · {wfCount} WF
              </span>
            </div>
          )
        }
      })

      if (parent.id !== 'Built-In') {
        parent.childNodes?.push({
          id: 'addWorkflow',
          name: 'addWorkflow',
          label: (
            <div className={cx(style.treeNode, style.treeNodeAdder)}>
              <span>{lang.tr('studio.flow.sidePanel.addWorkflow')}</span>
            </div>
          ),
          parent,
          icon: 'plus',
          type: 'addWorkflow',
          nodeData: {
            type: 'addWorkflow',
            topic: parent.id
          }
        })
      }
    })

    return tree
  }

  const activeFlow = props.currentFlow?.name
  return (
    <React.Fragment>
      {flows.length <= 3 && (
        <div className={style.topicsEmptyState}>
          <div className={style.topicsEmptyStateBlock}>
            <img width="70" src="assets/ui-studio/public/img/empty-state.svg" alt="Empty folder" />
            <div className={style.topicsEmptyStateText}>{lang.tr('studio.flow.sidePanel.tapIconsToAdd')}</div>
          </div>
        </div>
      )}
      <TreeView<NodeData>
        elements={flows}
        nodeRenderer={nodeRenderer}
        folderRenderer={folderRenderer}
        postProcessing={postProcessing}
        onContextMenu={handleContextMenu}
        onClick={onClick}
        visibleElements={activeFlow && [{ field: 'name', value: activeFlow }]}
        onDoubleClick={onDoubleClick}
        filterText={props.filter}
        pathProps="name"
        filterProps="name"
      />
    </React.Fragment>
  )
}

export default TopicList
