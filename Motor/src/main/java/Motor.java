import org.gnu.glpk.GLPK;
import org.gnu.glpk.GLPKConstants;
import org.gnu.glpk.GlpkException;
import org.gnu.glpk.SWIGTYPE_p_double;
import org.gnu.glpk.SWIGTYPE_p_int;
import org.gnu.glpk.glp_prob;
import org.gnu.glpk.glp_smcp;

public class Motor {
	private static glp_prob lp;
	private static glp_smcp parm;
    private static SWIGTYPE_p_int ind;
    private static SWIGTYPE_p_double val;
    
    // Create problem
    public static void createProblem(String problem_name) {
        lp = GLPK.glp_create_prob();
        GLPK.glp_set_prob_name(lp, problem_name);
        System.out.println("The problem " + problem_name + " was created");
    }
    
    // Calculate problem result
    public static int calculateResult() {
    	return GLPK.glp_simplex(lp, parm);
    }
    
    // Delete problem to free memory
    public static void deleteProblem(glp_prob lp) {
        GLPK.glp_delete_prob(lp);
    }
    
    // Define columns
    public static void defineColumns(String variables[]) {
    	int nColumns = variables.length;
    	
        GLPK.glp_add_cols(lp, nColumns);
        for(int i = 0, column = 1; i < nColumns; i++, column++) {
            GLPK.glp_set_col_name(lp, column, variables[i]);
            GLPK.glp_set_col_kind(lp, column, GLPKConstants.GLP_CV);
            GLPK.glp_set_col_bnds(lp, column, GLPKConstants.GLP_DB, 0, .5);
        }
    }
    
    public static void defineConstraints() {
        // Create constraints
        GLPK.glp_add_rows(lp, 1);
        GLPK.glp_set_row_name(lp, 1, "c1");
        GLPK.glp_set_row_bnds(lp, 1, GLPKConstants.GLP_DB, 0, 0.2);
        ind = GLPK.new_intArray(3);
        GLPK.intArray_setitem(ind, 1, 1);
        GLPK.intArray_setitem(ind, 2, 2);
        val = GLPK.new_doubleArray(3);
        GLPK.doubleArray_setitem(val, 1, 1.);
        GLPK.doubleArray_setitem(val, 2, -1.);
        GLPK.glp_set_mat_row(lp, 1, 2, ind, val);
    }
    
    // Define Objective Function
    public static void defineOF() {
        // Define objective
        GLPK.glp_set_obj_name(lp, "z");
        GLPK.glp_set_obj_dir(lp, GLPKConstants.GLP_MIN);
        GLPK.glp_set_obj_coef(lp, 0, 1.);
        GLPK.glp_set_obj_coef(lp, 1, -.5);
        GLPK.glp_set_obj_coef(lp, 2, .5);
    }
    
    public static void main(String[] args) {
        try {
        	createProblem("Maximiza��o de lucros: Del�cias Caseiras");
        	
        	String[] variables = {"x1", "x2"};
        	defineColumns(variables);
        	
        	defineConstraints();
        	
        	defineOF();
                    
            // Solve model
            parm = new glp_smcp();
            GLPK.glp_init_smcp(parm);
            int solution = calculateResult();
            
            // Retrieve solution
            if (solution == 0) {
                write_lp_solution(lp);
            } else {
                System.out.println("The problem could not be solved");
            }
            deleteProblem(lp);
        } catch (GlpkException ex) {
            ex.printStackTrace();
        }
    }
    /**
     * write simplex solution
     * @param lp problem
     */
    static void write_lp_solution(glp_prob lp) {
        int i;
        int n;
        String name;
        double val;
        name = GLPK.glp_get_obj_name(lp);
        val = GLPK.glp_get_obj_val(lp);
        System.out.print(name);
        System.out.print(" = ");
        System.out.println(val);
        n = GLPK.glp_get_num_cols(lp);
        for (i = 1; i <= n; i++) {
            name = GLPK.glp_get_col_name(lp, i);
            val = GLPK.glp_get_col_prim(lp, i);
            System.out.print(name);
            System.out.print(" = ");
            System.out.println(val);
        }
    }
}
