import ArgumentParser from './parsers/ArgumentParser'
import LiteralArgumentParser from './parsers/LiteralArgumentParser'
import DefinitionIDArgumentParser from './parsers/DefinitionIDArgumentParser'
import DefinitionDescriptionArgumentParser from './parsers/DefinitionDescriptionArgumentParser'

/**
 * Command tree of Minecraft Java Edition 1.14.4 commands/
 */
export const tree: CommandTree = {
    line: [
        {
            redirect: 'command'
        },
        {
            redirect: 'comment'
        }
    ],
    command: [

    ],
    comment: [
        { // #define (fakePlayer|tag|objective) <id: string> [description: string]
            name: '#define',
            parser: new LiteralArgumentParser(['#define']),
            description: 'Define an entity tag or a fake player. Will be used for completions.',
            children: {
                name: 'type',
                parser: new LiteralArgumentParser(['fakePlayer', 'tag', 'objective']),
                description: 'Type of the definition',
                children: {
                    name: 'id',
                    parser: new DefinitionIDArgumentParser(),
                    description: 'ID',
                    executable: true,
                    children: {
                        name: 'description',
                        parser: new DefinitionDescriptionArgumentParser(),
                        description: 'Description of the definition',
                        executable: true
                    }
                }
            }
        }
    ]
}

export default tree

/**
 * Represent a command tree.
 */
interface CommandTree {
    [id: string]: CommandTreeNode<any> | CommandTreeNode<any>[]
}

/**
 * Represent a node in the command tree.
 */
interface CommandTreeNode<T> {
    /**
     * The argument parser to parse this argument.
     */
    parser?: ArgumentParser<T>,
    /**
     * The name of this argument.
     */
    name?: string,
    /**
     * The description of the current argument.
     */
    description?: string,
    /**
     * Whether the command executable if it ends with the current node.
     */
    executable?: boolean,
    /**
     * Children of this tree node.
     */
    children?: CommandTreeNode<any> | CommandTreeNode<any>[],
    /**
     * Redirect the parsing process to specific node.
     */
    redirect?: string
}
